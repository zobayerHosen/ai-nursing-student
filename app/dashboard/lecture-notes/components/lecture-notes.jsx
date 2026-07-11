"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import ImageExtension from '@tiptap/extension-image';
import Toolbar from './toolbar';
import NoteCanvas from './note-canvas';
import SaveNameModal from './save-name-modal';
import ConfirmDiscardModal from './confirm-discard-modal';
import { IoMenu, IoSaveOutline, IoAddOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';

import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import {
  useGetNoteLists,
  useCreateNote,
  useUpdateNote,
  useFormatNoteWithAI,
} from '@/hooks/interactive-tools/lecture-notes.hook';
import LectureNotesSidebar from './lecture-notes-sidebar';

export default function LectureNotes() {
  const [activeTab, setActiveTab] = useState('upload');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [currentNoteTitle, setCurrentNoteTitle] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [lastFormattedHtml, setLastFormattedHtml] = useState('');
  const [hasPendingChanges, setHasPendingChanges] = useState(false);

  // Hooks
  const { refetch: refetchNotes } = useGetNoteLists();
  const { createLectureNote, isPending: isCreating } = useCreateNote();
  const { updateLectureNote, isPending: isUpdating } = useUpdateNote();
  const { formatWithAI, isPending: isFormatting } = useFormatNoteWithAI();

  // Track if we're editing an existing note
  const isEditing = Boolean(currentNoteId);

  // Initialize the Tiptap Text Engine context instance
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: { class: 'tiptap-paragraph' },
        },
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: { class: 'tiptap-highlight' },
      }),
      TextStyle,
      Color,
      ImageExtension.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4 shadow-sm inline-block block',
          style: 'display: block; max-width: 100%; height: auto; min-width: 50px; min-h-[50px];',
        },
      }),
    ],
    content: '<p>Start typing here or upload study materials...</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'tiptap prose prose-sm max-w-none focus:outline-none',
      },
    },
    onUpdate: () => {
      if (currentNoteId) {
        setHasPendingChanges(true);
      }
    },
  });



  // ─── PDF Content Extraction ──────────────────────────────────────

  const extractContentFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let combinedHTML = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);

      // --- 1. EXTRACT TEXT LAYOUT ---
      const textContent = await page.getTextContent();
      const lines = {};

      textContent.items.forEach((item) => {
        if (!item.str || item.str.trim() === '') return;
        const y = Math.round(item.transform[5]);
        if (!lines[y]) lines[y] = [];
        lines[y].push(item);
      });

      const sortedYCoordinates = Object.keys(lines).sort((a, b) => Number(b) - Number(a));
      let pageTextHTML = '';

      sortedYCoordinates.forEach((y) => {
        const lineItems = lines[y].sort((a, b) => a.transform[4] - b.transform[4]);
        let lineText = '';
        lineItems.forEach((item, index) => {
          if (index > 0) {
            const prevItem = lineItems[index - 1];
            const gap = item.transform[4] - (prevItem.transform[4] + prevItem.width);
            if (gap > 2) lineText += ' ';
          }
          lineText += item.str;
        });

        if (lineText.trim()) {
          pageTextHTML += `<p>${lineText.trim()}</p>`;
        }
      });

      combinedHTML += pageTextHTML;

      // --- 2. EXTRACT EMBEDDED IMAGES LAYOUT ---
      try {
        await page.getLoadingContext();
        const operatorList = await page.getOperatorList();

        const validImageOps = [
          pdfjs.OPS.paintImageXObject,
          pdfjs.OPS.paintInlineImageXObject,
        ];

        for (let j = 0; j < operatorList.fnArray.length; j++) {
          if (validImageOps.includes(operatorList.fnArray[j])) {
            const imgKey = operatorList.argsArray[j][0];

            const imageObj = await new Promise((resolve) => {
              page.objs.get(imgKey, (obj) => {
                if (obj) resolve(obj);
                else resolve(null);
              });
            });

            if (imageObj && (imageObj.bitmap || imageObj.data)) {
              let imageUrl = '';

              if (imageObj.bitmap) {
                const canvas = document.createElement('canvas');
                canvas.width = imageObj.bitmap.width;
                canvas.height = imageObj.bitmap.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(imageObj.bitmap, 0, 0);
                imageUrl = canvas.toDataURL('image/png');
              } else if (imageObj.data) {
                const canvas = document.createElement('canvas');
                canvas.width = imageObj.width;
                canvas.height = imageObj.height;
                const ctx = canvas.getContext('2d');
                const imgData = ctx.createImageData(imageObj.width, imageObj.height);

                imgData.data.set(imageObj.data);
                ctx.putImageData(imgData, 0, 0);
                imageUrl = canvas.toDataURL('image/png');
              }

              if (imageUrl) {
                combinedHTML += `<div><img src="${imageUrl}" alt="Extracted Image" /></div>`;
              }
            }
          }
        }
      } catch (imgError) {
        console.warn('Skipped page image extraction pass: ', imgError);
      }
    }

    return combinedHTML;
  };

  const handleConvert = async (file) => {
    if (!file) return;

    setIsExtracting(true);
    setCurrentNoteId(null);
    setCurrentNoteTitle('');
    setHasPendingChanges(false);
    setLastFormattedHtml('');
    editor?.commands.setContent(
      '<p><em>Extracting and parsing text and inline images... Please hold on.</em></p>'
    );

    try {
      const htmlContent = await extractContentFromPDF(file);

      if (!htmlContent) {
        editor?.commands.setContent(
          '<p><span style="color: #ef4444">Warning: No readable text or images found in this document.</span></p>'
        );
      } else {
        editor?.commands.setContent(htmlContent);
        toast.success('Content extracted successfully!');
      }
    } catch (error) {
      console.error('PDF Parsing Failure:', error);
      editor?.commands.setContent(
        '<p><span style="color: #ef4444">An error occurred while compiling your document.</span></p>'
      );
      toast.error('Failed to extract content from PDF');
    } finally {
      setIsExtracting(false);
    }
  };

  // ─── Note Selection ──────────────────────────────────────────────

  const handleSelectNote = useCallback(
    async (note) => {
      setCurrentNoteId(note.id);
      setCurrentNoteTitle(note.title || 'Untitled Note');
      setHasPendingChanges(false);
      setActiveTab('notes');

      // Set editor content
      const content = note.formatted_html || note.user_html;
      if (content) {
        editor?.commands.setContent(content);
        setLastFormattedHtml(note.formatted_html || '');
      } else {
        editor?.commands.setContent('<p>Start typing here...</p>');
        setLastFormattedHtml('');
      }

      // Close sidebar on mobile
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    },
    [editor]
  );

  // ─── AI Format ────────────────────────────────────────────────────

  const handleAIFormat = useCallback(async () => {
    if (!editor) return;

    const content = editor.getText();
    if (!content.trim()) {
      toast.error('No content to format. Please add some text first.');
      return;
    }

    try {
      const result = await formatWithAI({ html: editor.getHTML() });
      const formattedHtml = result?.data?.formatted_html || '';
      if (formattedHtml) {
        editor.commands.setContent(formattedHtml);
        setLastFormattedHtml(formattedHtml);
        toast.success('Content formatted successfully!');
      } else {
        toast.error('Failed to format content');
      }
    } catch (err) {
      console.error('AI Format error:', err);
      toast.error(err?.response?.data?.message || 'Failed to format with AI');
    }
  }, [editor, formatWithAI]);

  // ─── Save / Update ────────────────────────────────────────────────

  const handleOpenSaveModal = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const plainText = editor.getText().trim();

    if (!plainText || plainText === 'Start typing here or upload study materials...') {
      toast.error('No content to save. Please add some text first.');
      return;
    }

    if (isEditing) {
      // Direct update, no name popup
      handleSaveNote(currentNoteTitle || 'Untitled Note');
    } else {
      setShowSaveModal(true);
    }
  };

  const handleSaveNote = async (title) => {
    if (!editor) return;

    const userHtml = editor.getHTML();
    const payload = {
      title,
      user_html: userHtml,
      formatted_html: userHtml,
    };

    try {
      if (isEditing) {
        // Update existing note
        const result = await updateLectureNote({ id: currentNoteId, ...payload });
        setLastFormattedHtml(userHtml);
        toast.success(result?.message || 'Note updated successfully');
      } else {
        // Create new note
        const result = await createLectureNote(payload);
        const newNote = result?.data?.data || result?.data;
        if (newNote?.id) {
          setCurrentNoteId(newNote.id);
          setCurrentNoteTitle(newNote.title || title);
          setLastFormattedHtml(userHtml);
        }
        toast.success(result?.message || 'Note saved successfully');
      }
      setShowSaveModal(false);
      setHasPendingChanges(false);
      refetchNotes();
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || `Failed to ${isEditing ? 'update' : 'save'} note`;
      toast.error(errorMsg);
    }
  };

  // ─── New Note ─────────────────────────────────────────────────────

  const performNewNoteCreation = () => {
    if (editor) {
      editor.commands.setContent('<p>Start typing here or upload study materials...</p>');
      setCurrentNoteId(null);
      setCurrentNoteTitle('');
      setLastFormattedHtml('');
      setHasPendingChanges(false);
      setActiveTab('upload');
    }
  };

  const handleNewNote = () => {
    if (editor) {
      // Check for unsaved changes
      if (hasPendingChanges && currentNoteId) {
        setShowDiscardModal(true);
      } else {
        performNewNoteCreation();
      }
    }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isPending = isCreating || isUpdating;
  const saveButtonText = isEditing ? 'Update' : 'Save';

  return (
    <div className="flex flex-col lg:flex-row w-full h-dvh lg:h-screen bg-[#F8F9FA] text-[#333E49] overflow-hidden font-sans">
      {/* Sidebar with mobile toggle - visible on lg screens */}
      <div
        className={`fixed lg:static top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <LectureNotesSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onConvert={handleConvert}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          currentNoteId={currentNoteId}
          onSelectNote={handleSelectNote}
        />
      </div>

      {/* Overlay for mobile/tablet */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Right Panel */}
      <div className="flex-1 flex flex-col h-full min-h-0 w-full overflow-hidden border-t lg:border-t-0 lg:border-l border-gray-200">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between px-4 sm:px-8 py-3 bg-white border-b border-gray-100 gap-2 shrink-0">
          {/* Left side - Hamburger menu (visible on mobile/tablet) */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <IoMenu className="w-5 h-5 text-[#333E49]" />
            </button>
          </div>

          {/* Right side - Action Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleOpenSaveModal}
              disabled={isPending}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2B5C8F] hover:bg-[#224A73] rounded-lg transition disabled:opacity-50"
            >
              <IoSaveOutline className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{saveButtonText}</span>
            </button>
            <button
              onClick={handleNewNote}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2B5C8F] bg-[#E3ECF5]/40 hover:bg-[#E3ECF5]/70 rounded-md transition"
            >
              <IoAddOutline className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Notes</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col p-4 md:p-6 gap-4 md:gap-6 overflow-y-auto items-center w-full min-h-0">
          <div className="w-full max-w-6xl shrink-0">
            <Toolbar
              editor={editor}
              onAIFormat={handleAIFormat}
              isFormatting={isFormatting}
            />
          </div>
          <div className="w-full max-w-6xl flex-1 min-h-0">
            <NoteCanvas editor={editor} />
          </div>
        </main>
      </div>

      {/* Save Name Modal */}
      <SaveNameModal
        key={`save-modal-${showSaveModal}`}
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSaveNote}
        isPending={isPending}
        defaultTitle={currentNoteTitle || "Untitled Note"}
        isEditing={isEditing}
      />

      {/* Confirm Discard Modal */}
      <ConfirmDiscardModal
        isOpen={showDiscardModal}
        onClose={() => setShowDiscardModal(false)}
        onConfirm={performNewNoteCreation}
      />
    </div>
  );
}

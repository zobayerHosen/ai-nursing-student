"use client";

import React, { useState } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import ImageExtension from '@tiptap/extension-image'; 
import Sidebar from './sidebar';
import Toolbar from './toolbar';
import NoteCanvas from './note-canvas';
import { IoMenu, IoSaveOutline, IoAddOutline, IoShareOutline } from 'react-icons/io5';

// Import PDFJS core
import * as pdfjs from 'pdfjs-dist';

// Set up the global background worker thread configuration
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function LectureNotes() {
  const [activeTab, setActiveTab] = useState('upload');
  const [noteTitle, setNoteTitle] = useState('Untitled Note');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          style: 'display: block; max-width: 100%; height: auto; min-width: 50px; min-h-[50px];'
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
  });

  // Rich Layout-Aware Text + Embedded Image extraction
  const extractContentFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let combinedHTML = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      
      // --- 1. EXTRACT TEXT LAYOUT ---
      const textContent = await page.getTextContent();
      const lines = {};
      
      textContent.items.forEach((item) => {
        if (!item.str || item.str.trim() === "") return;
        const y = Math.round(item.transform[5]); 
        if (!lines[y]) lines[y] = [];
        lines[y].push(item);
      });

      const sortedYCoordinates = Object.keys(lines).sort((a, b) => Number(b) - Number(a));
      let pageTextHTML = "";
      
      sortedYCoordinates.forEach((y) => {
        const lineItems = lines[y].sort((a, b) => a.transform[4] - b.transform[4]);
        let lineText = "";
        lineItems.forEach((item, index) => {
          if (index > 0) {
            const prevItem = lineItems[index - 1];
            const gap = item.transform[4] - (prevItem.transform[4] + prevItem.width);
            if (gap > 2) lineText += " ";
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
          pdfjs.OPS.paintInlineImageXObject
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
              let imageUrl = "";

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
        console.warn("Skipped page image extraction pass: ", imgError);
      }
    }
    
    return combinedHTML;
  };

  const handleConvert = async (file) => {
    if (!file) return;
    
    setIsExtracting(true);
    editor?.commands.setContent('<p><em>Extracting and parsing text and inline images... Please hold on.</em></p>');

    try {
      const htmlContent = await extractContentFromPDF(file);
      
      if (!htmlContent) {
        editor?.commands.setContent('<p><span style="color: #ef4444">Warning: No readable text or images found in this document.</span></p>');
      } else {
        editor?.commands.setContent(htmlContent);
      }
    } catch (error) {
      console.error("PDF Parsing Failure:", error);
      editor?.commands.setContent('<p><span style="color: #ef4444">An error occurred while compiling your document.</span></p>');
    } finally {
      setIsExtracting(false);
    }
  };

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handler functions for header buttons
  const handleSave = () => {
    alert('Note saved successfully!');
  };

  const handleNewNote = () => {
    if (editor) {
      editor.commands.setContent('<p>Start typing here or upload study materials...</p>');
      setNoteTitle('Untitled Note');
      setActiveTab('upload');
    }
  };

  const handleShare = () => {
    alert('Share link copied to clipboard!');
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-[100dvh] lg:h-screen bg-[#F8F9FA] text-[#333E49] overflow-hidden font-sans">
      
      {/* Sidebar with mobile toggle - visible on lg screens */}
      <div className={`
        fixed lg:static top-0 left-0 h-full z-50
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          noteTitle={noteTitle} 
          setNoteTitle={setNoteTitle} 
          onConvert={handleConvert}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
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
        <header className="flex flex-wrap items-center justify-between px-4 sm:px-8 py-3 bg-white border-b border-gray-100 gap-2 flex-shrink-0">
          {/* Left side - Hamburger menu (visible on mobile/tablet) + Title */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <IoMenu className="w-5 h-5 text-[#333E49]" />
            </button>
            <h2 className="text-sm font-semibold text-[#333E49] truncate max-w-[120px]">
              {noteTitle}
            </h2>
          </div>

          {/* Right side - Action Buttons */}
          <div className="flex items-center gap-2 ml-auto xl:lg:ml-0 xl:px-16">
            <button 
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2B5C8F] bg-[#E3ECF5]/40 hover:bg-[#E3ECF5]/70 rounded-md transition"
            >
              <IoSaveOutline className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save</span>
            </button>
            <button 
              onClick={handleNewNote}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2B5C8F] bg-[#E3ECF5]/40 hover:bg-[#E3ECF5]/70 rounded-md transition"
            >
              <IoAddOutline className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Notes</span>
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2B5C8F] bg-[#E3ECF5]/40 hover:bg-[#E3ECF5]/70 rounded-md transition"
            >
              <IoShareOutline className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col p-4 md:p-6 gap-4 md:gap-6 overflow-y-auto items-center w-full min-h-0">
          <div className="w-full max-w-6xl flex-shrink-0">
            <Toolbar editor={editor} />
          </div>
          <div className="w-full max-w-6xl flex-1 min-h-0">
            <NoteCanvas 
              noteTitle={noteTitle} 
              setNoteTitle={setNoteTitle} 
              editor={editor} 
            />
          </div>
        </main>
      </div>
    </div>
  );
}
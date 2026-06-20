"use client";

import React, { useState, useEffect } from 'react';
import { 
  IoClose, 
  IoSparkles, 
  IoArrowUndo, 
  IoArrowRedo
} from 'react-icons/io5';
import { 
  FaQuoteLeft,
  FaList,
  FaListOl
} from 'react-icons/fa6';

export default function Toolbar({ editor }) {
  if (!editor) return null;

  // State for modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);

  // State to track active states manually
  const [activeStates, setActiveStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    h1: false,
    h2: false,
    h3: false,
    bulletList: false,
    orderedList: false,
    blockquote: false,
    highlight: false,
    textColor: false,
  });

  // Update active states whenever editor changes
  useEffect(() => {
    if (!editor) return;

    const updateActiveStates = () => {
      setActiveStates({
        bold: editor.isActive('bold'),
        italic: editor.isActive('italic'),
        underline: editor.isActive('underline'),
        h1: editor.isActive('heading', { level: 1 }),
        h2: editor.isActive('heading', { level: 2 }),
        h3: editor.isActive('heading', { level: 3 }),
        bulletList: editor.isActive('bulletList'),
        orderedList: editor.isActive('orderedList'),
        blockquote: editor.isActive('blockquote'),
        highlight: editor.isActive('highlight'),
        textColor: editor.isActive('textStyle'),
      });
    };

    // Update on selection change
    editor.on('selectionUpdate', updateActiveStates);
    editor.on('transaction', updateActiveStates);
    
    // Initial update
    updateActiveStates();

    return () => {
      editor.off('selectionUpdate', updateActiveStates);
      editor.off('transaction', updateActiveStates);
    };
  }, [editor]);

  // Real color matching hex values
  const highlightColors = [
    { name: 'Yellow', value: '#FEF08A' },
    { name: 'Pink', value: '#FBCFE8' },
    { name: 'Green', value: '#BBF7D0' },
    { name: 'Blue', value: '#BFDBFE' },
    { name: 'Orange', value: '#FED7AA' }
  ];

  const textColors = [
    '#2B5C8F', '#EC4899', '#16A34A', '#B45309', 
    '#9333EA', '#0891B2', '#DC2626', '#94A3B8'
  ];

  // Helper function to set highlight with proper mark
  const setHighlight = (color) => {
    if (!editor) return;
    editor.chain().focus().setHighlight({ color: color }).run();
  };

  // Helper function to set text color
  const setTextColor = (color) => {
    if (!editor) return;
    editor.chain().focus().setColor(color).run();
  };

  // Clear ALL formatting
  const clearFormatting = () => {
    if (!editor) return;
    editor.chain()
      .focus()
      .unsetAllMarks()
      .clearNodes()
      .run();
  };

  // Delete all content
  const deleteAllContent = () => {
    if (!editor) return;
    editor.chain().focus().clearContent().run();
    setShowDeleteModal(false);
  };

  // AI Format function - formats the content with custom rules
  const applyAIFormat = () => {
    if (!editor) return;
    
    setIsFormatting(true);
    
    try {
      // Get current content as text
      const content = editor.getText();
      
      if (!content.trim()) {
        alert('No content to format. Please add some text first.');
        setIsFormatting(false);
        return;
      }

      // Apply custom formatting rules
      const formattedHtml = formatContentWithAI(content);
      
      // Replace editor content with formatted HTML
      editor.commands.setContent(formattedHtml);
      
      setShowAIModal(false);
      setIsFormatting(false);
      
    } catch (error) {
      console.error('AI Format error:', error);
      alert('Failed to format content. Please try again.');
      setIsFormatting(false);
    }
  };

  // Custom formatting function
  const formatContentWithAI = (text) => {
    // Split text into lines
    const lines = text.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) {
      return '<p>No content to format.</p>';
    }

    let html = '';
    let inList = false;
    let listItems = [];
    let titleDetected = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      
      // Skip empty lines
      if (!line) continue;

      // Check if this is a bullet list item
      if (line.startsWith('- ') || line.startsWith('• ') || line.startsWith('* ')) {
        listItems.push(line.substring(2).trim());
        inList = true;
        continue;
      }

      // Check if it's a numbered list
      if (/^\d+\.\s/.test(line)) {
        const parts = line.split('. ');
        listItems.push(parts.slice(1).join('. '));
        inList = true;
        continue;
      }

      // If we were in a list and this line is not a list item, close the list
      if (inList) {
        html += `<ul>\n`;
        listItems.forEach(item => {
          html += `  <li>${item}</li>\n`;
        });
        html += `</ul>\n`;
        listItems = [];
        inList = false;
      }

      // Detect Title (first line, short, or all caps)
      if (!titleDetected && i === 0 && line.length < 60) {
        html += `<h1>${line}</h1>\n`;
        titleDetected = true;
        continue;
      }

      // Detect Subheadings (short lines, or lines ending with colon)
      if (line.length < 50 || line.endsWith(':') || line.match(/^[A-Z][a-z]+\s+[A-Z]/)) {
        // Check if it's a subtitle (not too short, not too long)
        if (line.length > 10 && line.length < 60) {
          html += `<h2>${line}</h2>\n`;
          continue;
        }
      }

      // Detect Sub-subheadings (very short, usually 1-3 words)
      if (line.split(' ').length <= 3 && line.length < 30 && line !== lines[0]) {
        html += `<h3>${line}</h3>\n`;
        continue;
      }

      // Check for blockquotes (lines with > or multiple sentences)
      if (line.startsWith('> ') || line.includes(' said ') || line.includes('according to')) {
        const quoteText = line.startsWith('> ') ? line.substring(2) : line;
        html += `<blockquote>${quoteText}</blockquote>\n`;
        continue;
      }

      // Regular paragraph
      html += `<p>${line}</p>\n`;
    }

    // Close any open list
    if (inList && listItems.length > 0) {
      html += `<ul>\n`;
      listItems.forEach(item => {
        html += `  <li>${item}</li>\n`;
      });
      html += `</ul>\n`;
    }

    return html || '<p>No content to format.</p>';
  };

  // AI Format modal handler
  const handleAIFormat = () => {
    if (!editor) return;
    const content = editor.getText();
    
    if (!content.trim()) {
      alert('No content to format. Please add some text first.');
      return;
    }
    
    setShowAIModal(true);
  };

  // Check if highlight is active with specific color
  const isHighlightActive = (color) => {
    if (!editor) return false;
    return editor.isActive('highlight', { color: color });
  };

  // Check if text color is active with specific color
  const isTextColorActive = (color) => {
    if (!editor) return false;
    return editor.isActive('textStyle', { color: color });
  };

  // Check if any highlight is active
  const isAnyHighlightActive = () => {
    if (!editor) return false;
    return editor.isActive('highlight');
  };

  // Check if any text color is active
  const isAnyTextColorActive = () => {
    if (!editor) return false;
    return editor.isActive('textStyle');
  };

  return (
    <>
      <div className="w-full max-w-4xl bg-[#F4F5F6] rounded-2xl p-3 flex flex-col gap-2 shadow-inner border border-gray-200/40">
        
        {/* Row 1: Structural Content & Formatting Nodes */}
        <div className="flex items-center justify-center gap-6 text-sm font-bold text-gray-600 border-b border-gray-200/50 pb-2 flex-wrap">
          <div className="flex gap-3">
            <button 
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
              className={`cursor-pointer transition px-2 py-0.5 rounded min-w-[32px] ${
                activeStates.h1
                  ? 'bg-[#2B5C8F] text-white border border-[#2B5C8F] shadow-sm' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent'
              }`}
            >
              H1
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
              className={`cursor-pointer transition px-2 py-0.5 rounded min-w-[32px] ${
                activeStates.h2
                  ? 'bg-[#2B5C8F] text-white border border-[#2B5C8F] shadow-sm' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent'
              }`}
            >
              H2
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
              className={`cursor-pointer transition px-2 py-0.5 rounded min-w-[32px] ${
                activeStates.h3
                  ? 'bg-[#2B5C8F] text-white border border-[#2B5C8F] shadow-sm' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent'
              }`}
            >
              H3
            </button>
          </div>
          
          <div className="h-4 w-px bg-gray-300" />
          
          <div className="flex gap-3 text-base">
            <button 
              onClick={() => editor.chain().focus().toggleBold().run()} 
              className={`cursor-pointer transition px-2 py-0.5 rounded min-w-[32px] ${
                activeStates.bold
                  ? 'bg-[#2B5C8F] text-white border border-[#2B5C8F] shadow-sm font-extrabold' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent font-black'
              }`}
            >
              B
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleItalic().run()} 
              className={`cursor-pointer transition px-2 py-0.5 rounded min-w-[32px] ${
                activeStates.italic
                  ? 'bg-[#2B5C8F] text-white border border-[#2B5C8F] shadow-sm italic' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent'
              }`}
            >
              I
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleUnderline().run()} 
              className={`cursor-pointer transition px-2 py-0.5 rounded min-w-[32px] ${
                activeStates.underline
                  ? 'bg-[#2B5C8F] text-white border border-[#2B5C8F] shadow-sm underline' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent'
              }`}
            >
              U
            </button>
          </div>
          
          <div className="h-4 w-px bg-gray-300" />
          
          {/* Professional List Buttons with Font Awesome Icons */}
          <div className="flex gap-3 text-sm">
            <button 
              onClick={() => editor.chain().focus().toggleBulletList().run()} 
              className={`cursor-pointer transition px-2 py-0.5 rounded min-w-[36px] flex items-center justify-center ${
                activeStates.bulletList
                  ? 'bg-[#2B5C8F] text-white border border-[#2B5C8F] shadow-sm' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent'
              }`}
              title="Bullet List"
            >
              <FaList className="w-4 h-4" />
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleOrderedList().run()} 
              className={`cursor-pointer transition px-2 py-0.5 rounded min-w-[36px] flex items-center justify-center ${
                activeStates.orderedList
                  ? 'bg-[#2B5C8F] text-white border border-[#2B5C8F] shadow-sm' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent'
              }`}
              title="Numbered List"
            >
              <FaListOl className="w-4 h-4" />
            </button>
            <button 
              onClick={() => editor.chain().focus().toggleBlockquote().run()} 
              className={`cursor-pointer transition px-2 py-0.5 rounded min-w-[36px] flex items-center justify-center ${
                activeStates.blockquote
                  ? 'bg-[#2B5C8F] text-white border border-[#2B5C8F] shadow-sm' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent'
              }`}
              title="Quote"
            >
              <FaQuoteLeft className="w-4 h-4" />
            </button>
          </div>
          
          <div className="h-4 w-px bg-gray-300" />
          
          {/* Undo/Redo with React Icons */}
          <div className="flex gap-3 items-center">
            <button 
              onClick={() => editor.chain().focus().undo().run()} 
              className="cursor-pointer hover:bg-gray-200 transition px-2 py-0.5 rounded text-base min-w-[32px] flex items-center justify-center"
              title="Undo"
            >
              <IoArrowUndo className="w-4 h-4" />
            </button>
            <button 
              onClick={() => editor.chain().focus().redo().run()} 
              className="cursor-pointer hover:bg-gray-200 transition px-2 py-0.5 rounded text-base min-w-[32px] flex items-center justify-center"
              title="Redo"
            >
              <IoArrowRedo className="w-4 h-4" />
            </button>
          </div>
          
          <button 
            className={`cursor-pointer ml-2 bg-white text-[11px] px-3 py-1 rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-[#333E49] transition flex items-center gap-1.5 ${
              isFormatting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleAIFormat}
            disabled={isFormatting}
          >
            <IoSparkles className="w-3.5 h-3.5" />
            {isFormatting ? 'Formatting...' : 'AI Format'}
          </button>
        </div>

        {/* Row 2: Live Highlight Brush & Core Text Color Wheels */}
        <div className="bg-white rounded-xl p-2 px-4 flex items-center justify-between shadow-sm flex-wrap gap-3">
          {/* Text Selection Highlight Block */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-gray-400">Highlight</span>
            <div className="flex gap-2">
              {highlightColors.map((color, i) => (
                <button 
                  key={i} 
                  type="button"
                  onClick={() => setHighlight(color.value)}
                  className={`cursor-pointer w-5 h-5 rounded transition shadow-sm flex-shrink-0 ${
                    isHighlightActive(color.value) 
                      ? 'ring-2 ring-offset-2 ring-[#2B5C8F] shadow-md' 
                      : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={`Highlight ${color.name}`}
                />
              ))}
              <button 
                type="button"
                onClick={() => editor.chain().focus().unsetHighlight().run()}
                className={`cursor-pointer w-5 h-5 rounded border flex items-center justify-center transition flex-shrink-0 ${
                  isAnyHighlightActive() 
                    ? 'border-[#2B5C8F] bg-[#2B5C8F] text-white shadow-sm' 
                    : 'border-gray-200 text-gray-400 hover:border-gray-400 hover:bg-gray-50'
                }`}
                title="Remove highlight"
              >
                <IoClose className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="h-5 w-px bg-gray-200 flex-shrink-0" />

          {/* Text Font Base Color Block */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">Text Color</span>
            <div className="flex gap-2">
              {textColors.map((color, i) => (
                <button 
                  key={i} 
                  type="button"
                  onClick={() => setTextColor(color)}
                  className={`cursor-pointer w-4 h-4 rounded-full transition flex-shrink-0 ${
                    isTextColorActive(color) 
                      ? 'ring-2 ring-offset-2 ring-[#2B5C8F] shadow-md' 
                      : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  title={`Text color ${color}`}
                />
              ))}
              <button 
                type="button"
                onClick={() => editor.chain().focus().unsetColor().run()}
                className={`cursor-pointer w-4 h-4 rounded-full border flex items-center justify-center transition flex-shrink-0 ${
                  isAnyTextColorActive() 
                    ? 'border-[#2B5C8F] bg-[#2B5C8F] text-white shadow-sm' 
                    : 'border-gray-200 text-gray-400 hover:border-gray-400 hover:bg-gray-50'
                }`}
                title="Remove color"
              >
                <IoClose className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="h-5 w-px bg-gray-200 flex-shrink-0" />

          {/* Clear Formatting Button */}
          <button 
            type="button"
            onClick={clearFormatting}
            className="cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 transition text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 border border-gray-200 hover:border-red-300 bg-white shadow-sm flex-shrink-0"
            title="Clear All Formatting"
          >
            🗑️ Clear Format
          </button>

          {/* Delete Content Button */}
          <button 
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 transition text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 border border-gray-200 hover:border-red-300 bg-white shadow-sm flex-shrink-0"
            title="Delete All Content"
          >
            🗑️ Delete All
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1999]">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#333E49]">Delete All Content</h3>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="cursor-pointer text-gray-400 hover:text-gray-600 transition"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete all content? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button 
                onClick={deleteAllContent}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition shadow-sm"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Format Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1999]">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#333E49] flex items-center gap-2">
                <IoSparkles className="w-5 h-5 text-[#2B5C8F]" />
                AI Format
              </h3>
              <button 
                onClick={() => setShowAIModal(false)}
                className="cursor-pointer text-gray-400 hover:text-gray-600 transition"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">
                AI Format will analyze your content and apply intelligent formatting including:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                <li>Detect and format headings (H1, H2, H3)</li>
                <li>Create bulleted lists from key points</li>
                <li>Format blockquotes for important quotes</li>
                <li>Organize content structure</li>
                <li>Apply consistent formatting</li>
              </ul>
              <p className="text-sm text-gray-500 mt-3 italic">
                Content will be formatted using intelligent rules. No AI API required!
              </p>
            </div>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowAIModal(false)}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button 
                onClick={applyAIFormat}
                disabled={isFormatting}
                className={`cursor-pointer px-4 py-2 text-sm font-medium text-white bg-[#2B5C8F] hover:bg-[#224A73] rounded-lg transition shadow-sm flex items-center gap-2 ${
                  isFormatting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <IoSparkles className="w-4 h-4" />
                {isFormatting ? 'Formatting...' : 'Apply AI Format'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
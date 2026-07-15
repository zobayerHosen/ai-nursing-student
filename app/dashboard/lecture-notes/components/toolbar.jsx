"use client";

import React, { useState, useEffect } from 'react';
import { 
  IoClose, 
  IoSparkles, 
  IoArrowUndo, 
  IoArrowRedo,
  IoTrashOutline,
  IoTrashBinOutline
} from 'react-icons/io5';
import { 
  FaQuoteLeft,
  FaList,
  FaListOl
} from 'react-icons/fa6';

export default function Toolbar({ editor, onAIFormat, isFormatting }) {
  // State for modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

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
    setTimeout(() => {
      setActiveStates(prev => ({
        ...prev,
        highlight: editor.isActive('highlight'),
      }));
    }, 50);
  };

  // Helper function to set text color
  const setTextColor = (color) => {
    if (!editor) return;
    editor.chain().focus().setColor(color).run();
    setTimeout(() => {
      setActiveStates(prev => ({
        ...prev,
        textColor: editor.isActive('textStyle'),
      }));
    }, 50);
  };

  // Clear ALL formatting
  const clearFormatting = () => {
    if (!editor) return;
    
    const text = editor.getText();
    
    if (text.trim()) {
      const paragraphs = text.split('\n').filter(p => p.trim());
      let html = '';
      paragraphs.forEach(p => {
        html += `<p>${p.trim()}</p>`;
      });
      editor.commands.setContent(html || '<p></p>');
    }
    
    setTimeout(() => {
      setActiveStates({
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
    }, 50);
  };

  // Remove highlight
  const removeHighlight = () => {
    if (!editor) return;
    editor.chain().focus().unsetHighlight().run();
    setTimeout(() => {
      setActiveStates(prev => ({
        ...prev,
        highlight: editor.isActive('highlight'),
      }));
    }, 50);
  };

  // Remove color
  const removeColor = () => {
    if (!editor) return;
    editor.chain().focus().unsetColor().run();
    setTimeout(() => {
      setActiveStates(prev => ({
        ...prev,
        textColor: editor.isActive('textStyle'),
      }));
    }, 50);
  };

  // Delete all content
  const deleteAllContent = () => {
    if (!editor) return;
    editor.chain().focus().clearContent().run();
    setShowDeleteModal(false);
    setTimeout(() => {
      setActiveStates({
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
    }, 50);
  };

  // AI Format function - delegates to parent's API handler
  const applyAIFormat = () => {
    if (!onAIFormat) return;
    setShowAIModal(false);
    onAIFormat();
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

  // Check if any highlight is active - USE activeStates
  const isAnyHighlightActive = () => {
    return activeStates.highlight;
  };

  // Check if any text color is active - USE activeStates
  const isAnyTextColorActive = () => {
    return activeStates.textColor;
  };

  return (
    <>
      <div className="w-full bg-[#F4F5F6] rounded-2xl p-3 flex flex-col gap-2 shadow-inner border border-gray-200/40">
        
        {/* Row 1: Structural Content & Formatting Nodes */}
        <div className="flex items-center justify-center gap-6 text-sm font-bold text-gray-600 border-b border-gray-200/50 pb-2 flex-wrap">
          <div className="flex gap-3">
            <button 
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                setTimeout(() => setActiveStates(prev => ({...prev, h1: editor.isActive('heading', { level: 1 })})), 50);
              }} 
              className={`cursor-pointer transition px-2 py-0.5 rounded min-w-[32px] ${
                activeStates.h1
                  ? 'bg-[#2B5C8F] text-white border border-[#2B5C8F] shadow-sm' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent'
              }`}
            >
              H1
            </button>
            <button 
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                setTimeout(() => setActiveStates(prev => ({...prev, h2: editor.isActive('heading', { level: 2 })})), 50);
              }} 
              className={`cursor-pointer transition px-2 py-0.5 rounded min-w-[32px] ${
                activeStates.h2
                  ? 'bg-[#2B5C8F] text-white border border-[#2B5C8F] shadow-sm' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent'
              }`}
            >
              H2
            </button>
            <button 
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 3 }).run();
                setTimeout(() => setActiveStates(prev => ({...prev, h3: editor.isActive('heading', { level: 3 })})), 50);
              }} 
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
              onClick={() => {
                editor.chain().focus().toggleBold().run();
                setTimeout(() => setActiveStates(prev => ({...prev, bold: editor.isActive('bold')})), 50);
              }} 
              className={`cursor-pointer transition px-2 py-0.5 rounded min-w-[32px] ${
                activeStates.bold
                  ? 'bg-[#2B5C8F] text-white border border-[#2B5C8F] shadow-sm font-extrabold' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent font-black'
              }`}
            >
              B
            </button>
            <button 
              onClick={() => {
                editor.chain().focus().toggleItalic().run();
                setTimeout(() => setActiveStates(prev => ({...prev, italic: editor.isActive('italic')})), 50);
              }} 
              className={`cursor-pointer transition px-2 py-0.5 rounded min-w-[32px] ${
                activeStates.italic
                  ? 'bg-[#2B5C8F] text-white border border-[#2B5C8F] shadow-sm italic' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 border border-transparent'
              }`}
            >
              I
            </button>
            <button 
              onClick={() => {
                editor.chain().focus().toggleUnderline().run();
                setTimeout(() => setActiveStates(prev => ({...prev, underline: editor.isActive('underline')})), 50);
              }} 
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
          
          <div className="flex gap-3 text-sm">
            <button 
              onClick={() => {
                editor.chain().focus().toggleBulletList().run();
                setTimeout(() => setActiveStates(prev => ({...prev, bulletList: editor.isActive('bulletList')})), 50);
              }} 
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
              onClick={() => {
                editor.chain().focus().toggleOrderedList().run();
                setTimeout(() => setActiveStates(prev => ({...prev, orderedList: editor.isActive('orderedList')})), 50);
              }} 
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
              onClick={() => {
                editor.chain().focus().toggleBlockquote().run();
                setTimeout(() => setActiveStates(prev => ({...prev, blockquote: editor.isActive('blockquote')})), 50);
              }} 
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
          
          <div className="flex gap-3 items-center">
            <button 
              onClick={() => {
                editor.chain().focus().undo().run();
                setTimeout(() => setActiveStates(prev => ({...prev})), 50);
              }} 
              className="cursor-pointer hover:bg-gray-200 transition px-2 py-0.5 rounded text-base min-w-[32px] flex items-center justify-center"
              title="Undo"
            >
              <IoArrowUndo className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                editor.chain().focus().redo().run();
                setTimeout(() => setActiveStates(prev => ({...prev})), 50);
              }} 
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
            <IoSparkles className={`w-3.5 h-3.5 ${isFormatting ? 'animate-pulse' : ''}`} />
            AI Format
          </button>
        </div>

        {/* Row 2: Live Highlight Brush & Core Text Color Wheels - Centered on lg and smaller, full width on xl */}
        <div className="bg-white rounded-xl p-2 px-4 flex items-center justify-center xl:justify-between shadow-sm flex-wrap gap-3">
          {/* Text Selection Highlight Block */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-gray-400">Highlight</span>
            <div className="flex gap-2">
              {highlightColors.map((color, i) => (
                <button 
                  key={i} 
                  type="button"
                  onClick={() => {
                    setHighlight(color.value);
                  }}
                  className={`cursor-pointer w-5 h-5 rounded transition shadow-sm flex-shrink-0 ${
                    isHighlightActive(color.value) 
                      ? 'ring-2 ring-offset-2 ring-[#2B5C8F] shadow-md' 
                      : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 hover:bg-gray-100'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={`Highlight ${color.name}`}
                />
              ))}
              <button 
                type="button"
                onClick={removeHighlight}
                className="cursor-pointer w-5 h-5 rounded border border-gray-200 flex items-center justify-center transition flex-shrink-0 text-gray-400 hover:border-gray-400 hover:bg-gray-50"
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
                  onClick={() => {
                    setTextColor(color);
                  }}
                  className={`cursor-pointer w-4 h-4 rounded-full transition flex-shrink-0 ${
                    isTextColorActive(color) 
                      ? 'ring-2 ring-offset-2 ring-[#2B5C8F] shadow-md' 
                      : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 hover:bg-gray-100'
                  }`}
                  style={{ backgroundColor: color }}
                  title={`Text color ${color}`}
                />
              ))}
              <button 
                type="button"
                onClick={removeColor}
                className="cursor-pointer w-4 h-4 rounded-full border border-gray-200 flex items-center justify-center transition flex-shrink-0 text-gray-400 hover:border-gray-400 hover:bg-gray-50"
                title="Remove color"
              >
                <IoClose className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Clear Formatting & Delete Content - Visible on lg+ screens, hidden on smaller */}
          <div className="hidden lg:flex items-center gap-3">
            <button 
              type="button"
              onClick={clearFormatting}
              className="cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 transition text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 border border-gray-200 hover:border-red-300 bg-white shadow-sm flex-shrink-0"
              title="Clear All Formatting"
            >
              <IoTrashOutline className="w-3.5 h-3.5" />
              Clear Format
            </button>

            <button 
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 transition text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 border border-gray-200 hover:border-red-300 bg-white shadow-sm flex-shrink-0"
              title="Delete All Content"
            >
              <IoTrashBinOutline className="w-3.5 h-3.5" />
              Delete All
            </button>
          </div>
        </div>

        {/* Row 3: Clear Formatting & Delete Content - Visible only on smaller screens (below lg) */}
        <div className="flex lg:hidden items-center justify-center gap-3 pt-1 border-t border-gray-200/50">
          <button 
            type="button"
            onClick={clearFormatting}
            className="cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 transition text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 border border-gray-200 hover:border-red-300 bg-white shadow-sm"
            title="Clear All Formatting"
          >
            <IoTrashOutline className="w-3.5 h-3.5" />
            Clear Format
          </button>

          <button 
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 transition text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 border border-gray-200 hover:border-red-300 bg-white shadow-sm"
            title="Delete All Content"
          >
            <IoTrashBinOutline className="w-3.5 h-3.5" />
            Delete All
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1999 p-4">
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

      {/* AI Format Modal - Professional */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1999 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2B5C8F]/10 rounded-xl flex items-center justify-center">
                  <IoSparkles className="w-5 h-5 text-[#2B5C8F]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#333E49]">AI Format</h3>
                  <p className="text-xs text-gray-400">Intelligent formatting assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAIModal(false)}
                className="cursor-pointer text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-lg"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-xs text-gray-600 mb-3">
                AI Format will analyze your content and apply intelligent formatting including:
              </p>
              <ul className="text-xs text-gray-600 space-y-2">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#2B5C8F] rounded-full mt-1.5 shrink-0"></span>
                  <span>Detect and format headings <span className="text-gray-400">(H1, H2, H3)</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#2B5C8F] rounded-full mt-1.5 shrink-0"></span>
                  <span>Create bulleted lists from key points</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#2B5C8F] rounded-full mt-1.5 shrink-0"></span>
                  <span>Format blockquotes for important quotes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#2B5C8F] rounded-full mt-1.5 shrink-0"></span>
                  <span>Organize content structure logically</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-[#2B5C8F] rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Apply consistent formatting throughout</span>
                </li>
              </ul>
              {/* <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-xs text-blue-600 flex items-center gap-2">
                  <span className="text-blue-400">💡</span>
                  Content will be formatted using intelligent rules. No AI API required!
                </p>
              </div> */}
            </div>
            
            <div className="flex gap-3 justify-end border-t border-gray-100 pt-4">
              <button 
                onClick={() => setShowAIModal(false)}
                className="cursor-pointer px-5 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button 
                onClick={applyAIFormat}
                disabled={isFormatting}
                className={`cursor-pointer px-5 py-2 text-xs font-medium text-white bg-[#2B5C8F] hover:bg-[#224A73] rounded-lg transition shadow-sm flex items-center gap-2 ${
                  isFormatting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <IoSparkles className={`w-4 h-4 ${isFormatting ? 'animate-spin' : ''}`} />
                Apply AI Format
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
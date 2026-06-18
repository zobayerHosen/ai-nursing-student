"use client";

import React from 'react';

export default function Toolbar({ editor }) {
  if (!editor) return null;

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

  // Clear all formatting including highlights and colors
  const clearFormatting = () => {
    if (!editor) return;
    editor.chain()
      .focus()
      .unsetAllMarks()
      .run();
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

  return (
    <div className="w-full max-w-4xl bg-[#F4F5F6] rounded-2xl p-3 flex flex-col gap-2 shadow-inner border border-gray-200/40">
      
      {/* Row 1: Structural Content & Formatting Nodes */}
      <div className="flex items-center justify-center gap-6 text-sm font-bold text-gray-600 border-b border-gray-200/50 pb-2 flex-wrap">
        <div className="flex gap-3">
          <button 
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
            className={`cursor-pointer hover:text-black transition ${
              editor.isActive('heading', { level: 1 }) ? 'text-[#2B5C8F] bg-blue-50 px-1 rounded' : ''
            }`}
          >
            H1
          </button>
          <button 
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
            className={`cursor-pointer hover:text-black transition ${
              editor.isActive('heading', { level: 2 }) ? 'text-[#2B5C8F] bg-blue-50 px-1 rounded' : ''
            }`}
          >
            H2
          </button>
          <button 
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
            className={`cursor-pointer hover:text-black transition ${
              editor.isActive('heading', { level: 3 }) ? 'text-[#2B5C8F] bg-blue-50 px-1 rounded' : ''
            }`}
          >
            H3
          </button>
        </div>
        
        <div className="h-4 w-px bg-gray-300" />
        
        <div className="flex gap-3 text-base">
          <button 
            onClick={() => editor.chain().focus().toggleBold().run()} 
            className={`cursor-pointer font-serif font-black hover:text-black transition ${
              editor.isActive('bold') ? 'text-[#2B5C8F] bg-blue-50 px-1.5 py-0.5 rounded' : ''
            }`}
          >
            <span className={editor.isActive('bold') ? 'font-extrabold' : ''}>B</span>
          </button>
          <button 
            onClick={() => editor.chain().focus().toggleItalic().run()} 
            className={`cursor-pointer hover:text-black transition ${
              editor.isActive('italic') ? 'text-[#2B5C8F] bg-blue-50 px-1.5 py-0.5 rounded' : ''
            }`}
          >
            <span className={editor.isActive('italic') ? 'italic' : ''}>I</span>
          </button>
          <button 
            onClick={() => editor.chain().focus().toggleUnderline().run()} 
            className={`cursor-pointer hover:text-black transition ${
              editor.isActive('underline') ? 'text-[#2B5C8F] bg-blue-50 px-1.5 py-0.5 rounded' : ''
            }`}
          >
            <span className={editor.isActive('underline') ? 'underline' : ''}>U</span>
          </button>
        </div>
        
        <div className="h-4 w-px bg-gray-300" />
        
        <div className="flex gap-3 text-base">
          <button 
            onClick={() => editor.chain().focus().toggleBulletList().run()} 
            className={`cursor-pointer hover:text-black transition ${
              editor.isActive('bulletList') ? 'text-[#2B5C8F] bg-blue-50 px-1.5 py-0.5 rounded' : ''
            }`}
          >
            • 📋
          </button>
          <button 
            onClick={() => editor.chain().focus().toggleOrderedList().run()} 
            className={`cursor-pointer hover:text-black transition ${
              editor.isActive('orderedList') ? 'text-[#2B5C8F] bg-blue-50 px-1.5 py-0.5 rounded' : ''
            }`}
          >
            1. 📋
          </button>
          <button 
            onClick={() => editor.chain().focus().toggleBlockquote().run()} 
            className={`cursor-pointer hover:text-black transition ${
              editor.isActive('blockquote') ? 'text-[#2B5C8F] bg-blue-50 px-1.5 py-0.5 rounded' : ''
            }`}
          >
            ”
          </button>
        </div>
        
        <div className="h-4 w-px bg-gray-300" />
        
        <div className="flex gap-3 items-center text-xs">
          <button 
            onClick={() => editor.chain().focus().undo().run()} 
            className="cursor-pointer hover:text-black transition text-base"
          >
            ↩️
          </button>
          <button 
            onClick={() => editor.chain().focus().redo().run()} 
            className="cursor-pointer hover:text-black transition text-base"
          >
            ↪️
          </button>
        </div>
        
        <button 
          className="cursor-pointer ml-2 bg-white text-[11px] px-3 py-1 rounded-md shadow-sm border border-gray-100 hover:bg-gray-50 text-[#333E49] transition"
          onClick={() => alert('AI Format would be applied here')}
        >
          Ai Format
        </button>
      </div>

      {/* Row 2: Live Highlight Brush & Core Text Color Wheels */}
      <div className="bg-white rounded-xl p-2 px-4 flex items-center justify-between shadow-sm flex-wrap gap-2">
        {/* Text Selection Highlight Block */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-gray-400">Highlight</span>
          <div className="flex gap-1.5">
            {highlightColors.map((color, i) => (
              <button 
                key={i} 
                type="button"
                onClick={() => setHighlight(color.value)}
                className={`cursor-pointer w-5 h-5 rounded hover:scale-105 transition shadow-sm ${
                  isHighlightActive(color.value) ? 'ring-2 ring-offset-1 ring-[#2B5C8F] ring-offset-white scale-110' : ''
                }`}
                style={{ backgroundColor: color.value }}
                title={`Highlight ${color.name}`}
              />
            ))}
            <button 
              type="button"
              onClick={() => editor.chain().focus().unsetHighlight().run()}
              className="cursor-pointer w-5 h-5 rounded border border-gray-200 flex items-center justify-center text-xs text-gray-400 hover:bg-gray-50 transition"
              title="Remove highlight"
            >
              ×
            </button>
          </div>
        </div>

        <div className="h-5 w-px bg-gray-100" />

        {/* Text Font Base Color Block */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">Text Color</span>
          <div className="flex gap-1.5">
            {textColors.map((color, i) => (
              <button 
                key={i} 
                type="button"
                onClick={() => setTextColor(color)}
                className={`cursor-pointer w-4 h-4 rounded-full hover:scale-110 transition ${
                  isTextColorActive(color) ? 'ring-2 ring-offset-1 ring-[#2B5C8F] ring-offset-white scale-110' : ''
                }`}
                style={{ backgroundColor: color }}
                title={`Text color ${color}`}
              />
            ))}
            <button 
              type="button"
              onClick={() => editor.chain().focus().unsetColor().run()}
              className="cursor-pointer w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-gray-400 hover:bg-gray-50 transition"
              title="Remove color"
            >
              ×
            </button>
          </div>
        </div>

        <div className="h-5 w-px bg-gray-100" />

        {/* Clear Formatting Button */}
        <button 
          type="button"
          onClick={clearFormatting}
          className="cursor-pointer text-gray-400 hover:text-red-500 transition text-xs px-3 py-1.5 rounded-md hover:bg-red-50 flex items-center gap-1.5 border border-gray-200 hover:border-red-200"
          title="Clear Formatting"
        >
          🗑️ Clear Format
        </button>

        {/* Delete Content Button */}
        <button 
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you want to clear all content?')) {
              editor.chain().focus().clearContent().run();
            }
          }} 
          className="cursor-pointer text-gray-400 hover:text-red-500 transition text-xs px-3 py-1.5 rounded-md hover:bg-red-50 flex items-center gap-1.5 border border-gray-200 hover:border-red-200"
          title="Delete All Content"
        >
          🗑️ Delete All
        </button>
      </div>
    </div>
  );
}
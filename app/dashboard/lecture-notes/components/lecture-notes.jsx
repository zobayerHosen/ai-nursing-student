"use client";

import React, { useState } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Sidebar from './sidebar';
import Toolbar from './toolbar';
import NoteCanvas from './note-canvas';

export default function LectureNotes() {
  const [activeTab, setActiveTab] = useState('upload');
  const [noteTitle, setNoteTitle] = useState('Untitled Note');

  // Initialize the Tiptap Text Engine context instance
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Make sure paragraph is enabled
        paragraph: {
          HTMLAttributes: {
            class: 'tiptap-paragraph',
          },
        },
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: 'tiptap-highlight',
        },
      }),
      TextStyle,
      Color,
    ],
    content: '<p>Start typing here</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'tiptap prose prose-sm max-w-none focus:outline-none',
      },
    },
  });

  const handleConvert = () => {
    alert(`Converting study materials for title: "${noteTitle}"`);
  };

  return (
    <div className="flex w-full h-[90vh] bg-[#F8F9FA] text-[#333E49] overflow-hidden font-sans">
      {/* 1. Left Sidebar Child */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        noteTitle={noteTitle} 
        setNoteTitle={setNoteTitle} 
        onConvert={handleConvert} 
      />

      {/* Right Canvas/Workspace Panel Container */}
      <div className="flex-1 flex flex-col h-full overflow-hidden border-l border-gray-200">
        
        {/* Top Header Row */}
        <header className="flex justify-end items-center px-8 py-3 bg-white border-b border-gray-100 gap-2 flex-shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2B5C8F] bg-[#E3ECF5]/40 hover:bg-[#E3ECF5]/70 rounded-md transition">
            💾 Save
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2B5C8F] bg-[#E3ECF5]/40 hover:bg-[#E3ECF5]/70 rounded-md transition">
            ＋ New Notes
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2B5C8F] bg-[#E3ECF5]/40 hover:bg-[#E3ECF5]/70 rounded-md transition">
            🔗 Share
          </button>
        </header>

        {/* Dynamic Editor Main Body */}
        <main className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto items-center">
          {/* 2. Format Custom Toolbar Child */}
          <Toolbar editor={editor} />
          
          {/* 3. Text Canvas Workspace Child */}
          <NoteCanvas 
            noteTitle={noteTitle} 
            setNoteTitle={setNoteTitle} 
            editor={editor} 
          />
        </main>
      </div>
    </div>
  );
}
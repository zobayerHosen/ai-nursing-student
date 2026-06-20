"use client";

import React from 'react';
import { EditorContent } from '@tiptap/react';

export default function NoteCanvas({ noteTitle, setNoteTitle, editor }) {
  return (
    <>
      <style>{`
        .tiptap blockquote {
          border-left: 4px solid #2B5C8F;
          padding-left: 1rem;
          color: #6B7280;
          font-style: italic;
          margin: 0.75rem 0;
        }
        .tiptap blockquote::before {
          content: '"';
          font-size: 1.2rem;
          color: #2B5C8F;
          opacity: 0.5;
          font-family: Georgia, serif;
          display: inline;
          margin-right: 0;
        }
        .tiptap blockquote::after {
          content: '"';
          font-size: 1.2rem;
          color: #2B5C8F;
          opacity: 0.5;
          font-family: Georgia, serif;
          display: inline;
          margin-left: 0;
        }
        .tiptap blockquote p {
          display: inline;
        }
      `}</style>
      
      <div className="w-full max-w-4xl bg-white border border-gray-200/70 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] min-h-[450px] p-8 flex flex-col">
        
        {/* Main Big Note Title Heading */}
        <input 
          type="text" 
          value={noteTitle} 
          onChange={(e) => setNoteTitle(e.target.value)}
          className="text-3xl font-bold text-[#333E49] outline-none border-none placeholder-gray-300 w-full mb-4 tracking-tight bg-transparent"
          placeholder="Untitled Note"
        />

        {/* Tiptap Engine Mounting Point */}
        <div className="flex-1 w-full text-sm text-[#333E49] leading-relaxed font-normal
          [&_.tiptap]:outline-none 
          [&_.tiptap]:min-h-[380px]
          [&_.tiptap_p]:mb-3 
          [&_.tiptap_p]:min-h-[1rem]
          [&_.tiptap_mark]:rounded-sm 
          [&_.tiptap_mark]:px-0.5
          [&_.tiptap_h1]:text-3xl 
          [&_.tiptap_h1]:font-bold 
          [&_.tiptap_h1]:text-[#333E49] 
          [&_.tiptap_h1]:mb-3 
          [&_.tiptap_h1]:mt-4
          [&_.tiptap_h2]:text-2xl 
          [&_.tiptap_h2]:font-bold 
          [&_.tiptap_h2]:text-[#333E49] 
          [&_.tiptap_h2]:mb-2 
          [&_.tiptap_h2]:mt-3
          [&_.tiptap_h3]:text-xl  
          [&_.tiptap_h3]:font-bold 
          [&_.tiptap_h3]:text-[#333E49] 
          [&_.tiptap_h3]:mb-2 
          [&_.tiptap_h3]:mt-2
          [&_.tiptap_ul]:list-disc 
          [&_.tiptap_ul]:pl-5 
          [&_.tiptap_ul]:mb-3
          [&_.tiptap_ol]:list-decimal 
          [&_.tiptap_ol]:pl-5 
          [&_.tiptap_ol]:mb-3
          [&_.tiptap_blockquote]:border-l-4 
          [&_.tiptap_blockquote]:border-[#2B5C8F] 
          [&_.tiptap_blockquote]:pl-4 
          [&_.tiptap_blockquote]:text-gray-500 
          [&_.tiptap_blockquote]:italic 
          [&_.tiptap_blockquote]:my-3
          [&_.tiptap_highlight]:rounded-sm 
          [&_.tiptap_highlight]:px-0.5
          [&_.tiptap]:focus-within:outline-none
        ">
          <EditorContent editor={editor} className="h-full" />
        </div>
        
      </div>
    </>
  );
}
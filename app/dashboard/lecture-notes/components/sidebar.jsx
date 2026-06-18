"use client";

import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, noteTitle, setNoteTitle, onConvert }) {
  return (
    <aside className="w-[320px] bg-white h-full flex flex-col p-6 flex-shrink-0 border-r border-gray-200">
      <h2 className="text-xl font-bold text-[#333E49] mb-4">Lecture Notes</h2>
      
      {/* Upload vs Notes Toggle Tabs */}
      <div className="w-full flex border-b border-gray-200 mb-6">
        <button 
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-2 text-sm font-semibold transition ${
            activeTab === 'upload' ? 'bg-[#2B5C8F] text-white rounded-t-md' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Upload
        </button>
        <button 
          onClick={() => setActiveTab('notes')}
          className={`flex-1 py-2 text-sm font-semibold transition ${
            activeTab === 'notes' ? 'bg-[#2B5C8F] text-white rounded-t-md' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Notes
        </button>
      </div>

      {activeTab === 'upload' ? (
        /* Changed from justify-between to standard block layout with spacing so button wraps directly below */
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-lg font-bold text-[#333E49] mb-2">Upload Study Materials</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Upload any file. AI extracts and organises the content into clean study notes.
            </p>

            {/* Dash Border Upload Zone Box */}
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-[#E3ECF5]/30 hover:bg-[#E3ECF5]/50 rounded-2xl p-6 cursor-pointer transition text-center mb-6 min-h-[160px]">
              <div className="w-10 h-10 bg-[#2B5C8F] text-white rounded-full flex items-center justify-center mb-3 shadow-sm">⬆</div>
              <p className="text-xs font-bold text-[#333E49]">Drop files or click to browse</p>
              <p className="text-[10px] text-gray-400 mt-1">PlJh • DOCX • PPIX • IXI • Images</p>
              <input type="file" className="hidden" />
            </label>

            {/* Note Title Input Box */}
            <div className="flex flex-col gap-1.5 mb-6">
              <label className="text-xs font-semibold text-gray-400">Note Title</label>
              <input 
                type="text"
                placeholder="e.g. Cardiac Physiology — Week 3"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="w-full bg-[#F5F6F7] border border-transparent focus:border-gray-200 focus:bg-white outline-none rounded-xl p-3 text-xs text-[#333E49] transition placeholder-gray-300"
              />
            </div>
          </div>

          {/* Core Convert Button stays sequentially right below your title list */}
          <button onClick={onConvert} className="w-full bg-[#2B5C8F] hover:bg-[#224A73] text-white py-3 rounded-xl text-xs font-bold tracking-wide transition shadow-sm">
            Convert to Study Notes
          </button>
        </div>
      ) : (
        <div className="flex-1 text-center text-xs text-gray-400 pt-10">Empty notes.</div>
      )}
    </aside>
  );
}
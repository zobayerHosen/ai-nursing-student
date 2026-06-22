"use client";

import React, { useState } from 'react';
import { IoClose, IoDocumentText, IoCloudUpload, IoCreate } from 'react-icons/io5';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  noteTitle, 
  setNoteTitle, 
  onConvert,
  isOpen = false,
  setIsOpen 
}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleConvertClick = () => {
    if (!selectedFile) {
      alert("Please upload a PDF file first!");
      return;
    }
    onConvert(selectedFile);
    // Close sidebar on mobile/tablet after action
    if (window.innerWidth < 1024 && setIsOpen) {
      setIsOpen(false);
    }
  };

  const closeSidebar = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <aside className="w-[320px] bg-white h-full flex flex-col p-6 flex-shrink-0 border-r border-gray-200 shadow-lg lg:shadow-none overflow-y-auto mt-20">
      {/* Close button - Mobile/Tablet Only */}
      <div className="flex justify-between items-center mb-4 lg:hidden">
        <h2 className="text-xl font-bold text-[#333E49]">Lecture Notes</h2>
        <button 
          onClick={closeSidebar}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <IoClose className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Desktop Title - Hidden on mobile/tablet */}
      <h2 className="text-xl font-bold text-[#333E49] mb-4 hidden lg:block">Lecture Notes</h2>
      
      {/* Upload vs Notes Toggle Tabs */}
      <div className="w-full flex border-b border-gray-200 mb-6">
        <button 
          onClick={() => {
            setActiveTab('upload');
            if (window.innerWidth < 1024 && setIsOpen) setIsOpen(false);
          }}
          className={`cursor-pointer flex-1 py-2 text-sm font-semibold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'upload' ? 'bg-[#2B5C8F] text-white rounded-t-md' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <IoCloudUpload className="w-4 h-4" />
          <span>Upload</span>
        </button>
        <button 
          onClick={() => {
            setActiveTab('notes');
            if (window.innerWidth < 1024 && setIsOpen) setIsOpen(false);
          }}
          className={`cursor-pointer flex-1 py-2 text-sm font-semibold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'notes' ? 'bg-[#2B5C8F] text-white rounded-t-md' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <IoCreate className="w-4 h-4" />
          <span>Notes</span>
        </button>
      </div>

      {activeTab === 'upload' ? (
        <div className="flex flex-col gap-5 flex-1">
          <div>
            <h3 className="text-lg font-bold text-[#333E49] mb-2">Upload Study Materials</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Upload any file. AI extracts and organises the content into clean study notes.
            </p>

            {/* Dash Border Upload Zone Box */}
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-[#E3ECF5]/30 hover:bg-[#E3ECF5]/50 rounded-2xl p-6 cursor-pointer transition text-center mb-6 min-h-[160px]">
              <div className="w-10 h-10 bg-[#2B5C8F] text-white rounded-full flex items-center justify-center mb-3 shadow-sm text-base">
                {selectedFile ? <IoDocumentText className="w-5 h-5" /> : <IoCloudUpload className="w-5 h-5" />}
              </div>
              <p className="text-xs font-bold text-[#333E49] truncate max-w-full px-2">
                {selectedFile ? selectedFile.name : "Drop files or click to browse"}
              </p>
              <p className="text-[10px] text-gray-400 mt-1">PDF • DOCX • PPTX • Images</p>
              <input 
                type="file" 
                className="hidden" 
                accept="application/pdf" 
                onChange={handleFileChange} 
              />
            </label>

            {/* Convert Button */}
            <button 
              onClick={handleConvertClick} 
              className="w-full cursor-pointer bg-[#2B5C8F] hover:bg-[#224A73] text-white py-3 rounded-xl text-xs font-bold tracking-wide transition shadow-sm mb-6"
            >
              Convert to Study Notes
            </button>

            {/* Note Title Input Box */}
            <div className="flex flex-col gap-1.5">
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
        </div>
      ) : (
        <div className="flex-1 text-center text-xs text-gray-400 pt-10">Empty notes.</div>
      )}
    </aside>
  );
}
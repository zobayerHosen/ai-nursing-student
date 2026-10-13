"use client";

import { CloudUpload, Trash2, FileText, RefreshCw } from "lucide-react";
import { formatFileSize, ACCEPTED_FILE_TYPES } from "./quize-tool.constants";

export default function QuizeUploadBox({ selectedFile, setSelectedFile }) {
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
    event.target.value = "";
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  if (selectedFile) {
    return (
      <div className="relative flex flex-col rounded-lg border border-[#2C5F8D]/30 bg-[#E8F2FC] p-3.5 transition">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2C5F8D] text-white">
            <FileText size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="truncate text-xs font-semibold text-[#222427]"
              title={selectedFile.name}
            >
              {selectedFile.name}
            </p>
            {selectedFile.size ? (
              <p className="text-[10px] text-[#53606D]">
                {formatFileSize(selectedFile.size)}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={handleRemoveFile}
            title="Remove file"
            className="flex h-7 w-7 items-center justify-center rounded-md text-[#53606D] hover:bg-[#DCE5EF] hover:text-[#DC2626] transition cursor-pointer"
          >
            <Trash2 size={15} />
          </button>
        </div>

        {/* Replace / Remove action buttons */}
        <div className="mt-3 flex items-center gap-2 border-t border-[#D0E1F2] pt-2.5">
          <label className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-[#2C5F8D]/30 bg-white px-2.5 py-1.5 text-xs font-semibold text-[#2C5F8D] shadow-xs hover:bg-[#F0F6FC] transition">
            <RefreshCw size={13} />
            <span>Replace</span>
            <input
              type="file"
              className="hidden"
              accept={ACCEPTED_FILE_TYPES}
              onChange={handleFileChange}
            />
          </label>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#DC2626] shadow-xs hover:bg-[#FEF2F2] hover:border-[#FCA5A5] transition cursor-pointer"
          >
            <Trash2 size={13} />
            <span>Remove</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-[#DCE5EF] bg-[#E8EEF5] px-4 py-4 text-center transition hover:border-[#2C5F8D] hover:bg-[#E3ECF5]">
      <span className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#2C5F8D] text-white">
        <CloudUpload size={18} />
      </span>
      <span className="text-xs font-semibold text-[#222427]">
        Drop files or click to browse
      </span>
      <span className="mt-1 text-[10px] font-medium uppercase text-[#697586]">
        PDF • DOCX • PPTX • Images
      </span>
      <input
        type="file"
        className="hidden"
        accept={ACCEPTED_FILE_TYPES}
        onChange={handleFileChange}
      />
    </label>
  );
}

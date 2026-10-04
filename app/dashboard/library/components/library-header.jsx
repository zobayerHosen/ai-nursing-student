import React from "react";
import { Plus } from "lucide-react";

export default function LibraryHeader({ onCreateFolder }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Left: Icon, Title & Subtitle */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#1B4B66]/10 text-[#1B4B66] flex items-center justify-center shrink-0 mt-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M3.75 1.25H2.5C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V17.5C1.25 17.8315 1.3817 18.1495 1.61612 18.3839C1.85054 18.6183 2.16848 18.75 2.5 18.75H3.75C4.08152 18.75 4.39946 18.6183 4.63388 18.3839C4.8683 18.1495 5 17.8315 5 17.5V2.5C5 2.16848 4.8683 1.85054 4.63388 1.61612C4.39946 1.3817 4.08152 1.25 3.75 1.25ZM2.5 17.5V2.5H3.75V17.5H2.5ZM8.75 1.25H7.5C7.16848 1.25 6.85054 1.3817 6.61612 1.61612C6.3817 1.85054 6.25 2.16848 6.25 2.5V17.5C6.25 17.8315 6.3817 18.1495 6.61612 18.3839C6.85054 18.6183 7.16848 18.75 7.5 18.75H8.75C9.08152 18.75 9.39946 18.6183 9.63388 18.3839C9.8683 18.1495 10 17.8315 10 17.5V2.5C10 2.16848 9.8683 1.85054 9.63388 1.61612C9.39946 1.3817 9.08152 1.25 8.75 1.25ZM7.5 17.5V2.5H8.75V17.5H7.5ZM18.75 16.7562L14.8688 2.26875C14.7824 1.94894 14.5726 1.67649 14.2855 1.51126C13.9984 1.34602 13.6574 1.30151 13.3375 1.3875L12.1313 1.7125C11.8114 1.79887 11.539 2.00865 11.3738 2.29576C11.2085 2.58288 11.164 2.92384 11.25 3.24375L15.1313 17.7313C15.2027 17.9966 15.3596 18.231 15.5776 18.3982C15.7957 18.5654 16.0627 18.6561 16.3375 18.6562C16.4473 18.6567 16.5567 18.642 16.6625 18.6125L17.8688 18.2875C18.1886 18.2011 18.461 17.9914 18.6262 17.7042C18.7915 17.4171 18.836 17.0762 18.75 16.7562ZM16.3375 17.3813L12.4563 2.91875L13.6625 2.59375L17.5438 17.0813L16.3375 17.3813Z"
              fill="#64748B"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#044E79] tracking-tight">
            My Library
          </h1>
          <p className="text-[11px] sm:text-xs lg:text-sm text-[#64748b] mt-0.5">
            Save, organize and revisit the nursing notes you need most.
          </p>
        </div>
      </div>

      {/* Right: + New Folder Button */}
      <button
        type="button"
        onClick={onCreateFolder}
        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1B4B66] hover:bg-[#153a4f] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-xs cursor-pointer shrink-0 self-start sm:self-auto"
      >
        <Plus size={16} strokeWidth={2.5} />
        <span>New Folder</span>
      </button>
    </div>
  );
}

import Link from "next/link";
import { Bookmark, FileText } from "lucide-react";

export default function LibraryNoteCard({ note }) {
  const noteId = note?.content_id;

  return (
    <Link
      href={`/dashboard/library/${noteId}`}
      className="group bg-white rounded-xl border border-gray-200/75 hover:border-primary/40 hover:shadow-md transition-all duration-200 p-4 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Content */}
      <div>
        <div className="flex items-start gap-3">
          {/* Thumbnail Placeholder with subtle checkerboard pattern */}
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg bg-[#F8FAFC] border border-gray-200/60 overflow-hidden shrink-0 flex items-center justify-center relative shadow-2xs group-hover:scale-102 transition-transform">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)",
                backgroundSize: "12px 12px",
                backgroundPosition: "0 0, 0 6px, 6px -6px, -6px 0px",
              }}
            />
            <FileText className="w-6 h-6 text-gray-400 relative z-10 opacity-70 group-hover:text-[#1B4B66] transition-colors" />
          </div>

          {/* Note Details */}
          <div className="min-w-0 flex-1">
            {/* Category Badge & Bookmark Icon */}
            <div className="flex items-center justify-between gap-1">
              <span
                className={`text-[10px] font-bold tracking-wider uppercase rounded-full truncate text-gray-400`}
              >
                {note?.folderName ?? "N/F"}
              </span>
              <Bookmark className="w-4 h-4 text-[#1B4B66] fill-[#1B4B66] shrink-0" />
            </div>

            {/* Title */}
            <h3 className="text-sm sm:text-base font-bold text-[#1B4B66] group-hover:text-primary transition-colors line-clamp-1 mt-1.5">
              {note?.content_name ?? "N/F"}
            </h3>
            {/* saved date */}
            <span className="text-[11px] text-gray-400">
              Saved: {note?.added || "N/F"}
            </span>
          </div>
        </div>  
      </div>

      {/* Bottom Date */}
      <div className="text-[11px] text-gray-400 mt-3.5 pt-2.5 border-t border-gray-100 flex items-center justify-end">
        <span className="text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          View &rarr;
        </span>
      </div>
    </Link>
  );
}

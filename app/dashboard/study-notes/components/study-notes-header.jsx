import { BookOpen, Plus } from "lucide-react";
import Link from "next/link";

export default function StudyNotesHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1B4B66] flex items-center justify-center shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M2.92969 5.27344H0.585938V18.2422H5.95992C7.02105 18.2422 8.03875 18.6637 8.78906 19.4141H11.2109C11.9612 18.6637 12.9789 18.2422 14.0401 18.2422H19.4141V6.44531H17.0703"
                stroke="#64748B"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ fill: "none", stroke: "currentColor" }}
              />
              <path
                d="M10 5.27344H10.3672C11.4336 4.51168 12.6993 4.10156 14.0351 4.10156H17.0703V15.8984H14.0351C12.6993 15.8984 11.4336 16.3086 10.3672 17.0703H9.63277C8.56641 16.3086 7.30074 15.8984 5.96488 15.8984H2.92969V2.92969H5.27344"
                stroke="#64748B"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ fill: "none", stroke: "currentColor" }}
              />
              <path
                d="M5.27344 0.585939V12.3828C7.8623 12.3828 10 14.4814 10 17.0703V5.27344C10 2.68457 7.8623 0.585939 5.27344 0.585939Z"
                stroke="#64748B"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ fill: "none", stroke: "currentColor" }}
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#044E79] tracking-tight">
            Nursing Study Notes
          </h1>
        </div>

        <p className="text-[11px] sm:text-xs lg:text-sm text-[#64748b] mt-0.5">
          Concise, visual, high-yield notes built for nursing school and NCLEX review.
        </p>
      </div>

      {/* Top Right Action Button */}
      <Link
        href="/dashboard/lecture-notes"
        className="self-start inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#1B4B66] hover:bg-[#14394E] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
      >
        <Plus size={16} strokeWidth={2.5} />
        <span>Create Study Notes With AI</span>
      </Link>
    </div>
  );
};
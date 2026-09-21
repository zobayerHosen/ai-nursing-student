"use client";
import { useState } from "react";
import { Upload, X, FileText, Sparkles, CalendarDays, TrendingUp, Bell, ChevronRight } from "lucide-react";
import {
  useCalendarSyllabi,
  useUploadSyllabus,
  useDeleteSyllabus,
} from "@/hooks/calendars-planner";

const AI_FEATURES = [
  { icon: <CalendarDays size={16} />, title: "Course Info", desc: "Instructor, email, office hours, room & meeting times" },
  { icon: <CalendarDays size={16} />, title: "All Deadlines", desc: "Every exam, quiz, assignment & lab date pulled from your syllabus" },
  { icon: <TrendingUp size={16} />, title: "Grade Weights", desc: "Grading breakdown extracted for accurate GPA calculation" },
  { icon: <Bell size={16} />, title: "Smart Alerts", desc: "Color-coded urgency so you never miss a deadline" },
];

const STEPS = [
  "AI reads your syllabuses and extracts all course data",
  "Deadlines populate your calendar automatically",
  "Track completion and enter grades as you receive them",
  "GPA updates in real-time — always know where you stand",
];

export default function UploadView({ onComplete }) {
  const { syllabiData, isSyllabiLoading } = useCalendarSyllabi();
  console.log("Syllabi data", syllabiData)

  const { uploadSyllabus, isUploading } = useUploadSyllabus();
  const { deleteSyllabus, isDeletingSyllabus } = useDeleteSyllabus();

  const [dragging, setDragging] = useState(false);
  const [processingFile, setProcessingFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [statusError, setStatusError] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) uploadFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) uploadFiles(files);
    e.target.value = "";
  };

  const uploadFiles = async (fileList) => {
    for (const file of fileList) {
      await uploadSingleFile(file);
    }
  };

  const uploadSingleFile = async (file) => {
    setProcessingFile(file.name);
    setProgress(30);
    setStatusText(`⚙️ Processing ${file.name}...`);
    setStatusError(false);

    try {
      // Simulate step progress
      setTimeout(() => {
        setStatusText(`📖 Extracting course info & schedule...`);
        setProgress(65);
      }, 400);

      const result = await uploadSyllabus(file);

      setProgress(100);
      setStatusText(`✔️ ${result?.course?.code || "Course"} added! ${result?.new_events_count || 0} events placed on calendar.`);

      setTimeout(() => {
        setProcessingFile(null);
        setProgress(0);
        onComplete();
      }, 900);
    } catch (err) {
      setStatusText(`❌ Unable to identify course information from this document.`);
      setStatusError(true);
      setTimeout(() => {
        setProcessingFile(null);
        setProgress(0);
      }, 3000);
    }
  };

  const handleRemoveSyllabus = async (id) => {
    try {
      await deleteSyllabus(id);
    } catch (err) {
      console.error("Error deleting syllabus:", err);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-4 flex-col lg:flex-row">
        {/* Left: Upload Area */}
        <div className="w-full bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-sm flex flex-col gap-5">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-9 h-9 bg-[#EFF6FF] rounded-xl flex items-center justify-center text-[#3B82F6]">
              <CalendarDays size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1D2939]">Add Your Syllabus</h2>
              <p className="text-xs text-[#667085]">Upload your syllabuses to let AI extract and organize all your course information</p>
            </div>
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center gap-3 transition-all cursor-pointer ${dragging ? "border-[#3B82F6] bg-[#EFF6FF]" : "border-[#BFDBFE] bg-[#F8FBFF] hover:border-[#3B82F6] hover:bg-[#EFF6FF]"}`}
          >
            <div className="w-14 h-14 bg-[#DBEAFE] rounded-2xl flex items-center justify-center text-[#3B82F6]">
              <Upload size={26} />
            </div>
            <div className="text-center">
              <p className="font-semibold text-[#1D2939] text-sm">Drag &amp; drop your syllabus files here</p>
              <p className="text-xs text-[#667085] mt-1">or click to browse • PDF, Word, PowerPoint, text files up to 25 MB</p>
            </div>
            <label className="mt-2 px-5 py-2.5 bg-[#1D2939] hover:bg-[#2D3A4A] text-white text-sm font-semibold rounded-xl cursor-pointer flex items-center gap-2 transition-all">
              <Upload size={14} /> Upload Files
              <input type="file" multiple className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                onChange={handleFileInput}
              />
            </label>
          </div>

          {/* Processing Progress */}
          {processingFile && (
            <div className="bg-white border-[1.5px] border-[#93C5FD] rounded-xl p-4">
              <p className="text-sm font-bold text-[#1E40AF] mb-2">{statusText}</p>
              <div className="w-full h-2 bg-[#E2E8F0] rounded overflow-hidden mb-2">
                <div
                  className="h-full bg-[#2563EB] rounded transition-all duration-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-[#667085]">
                <span>1. Parsing document</span>
                <span>2. Extracting dates</span>
                <span>3. Updating calendar</span>
              </div>
            </div>
          )}

          {/* Uploaded list */}
          <div>
            <p className="text-sm font-semibold text-[#1D2939] mb-3">Uploaded Syllabi ({syllabiData?.length || 0})</p>
            <div className="flex flex-col gap-2">
              {syllabiData?.length === 0 ? (
                <div className="text-xs text-[#667085] text-center py-5 border border-dashed border-[#E4E7EC] rounded-xl bg-[#F8FAFC]">
                  No syllabi uploaded yet. Drag &amp; drop files above to start.
                </div>
              ) : (
                syllabiData?.map((s) => (
                  <div key={s.id} className="flex items-center gap-3 border border-[#E4E7EC] rounded-xl px-4 py-3 bg-white hover:bg-[#F9FAFB] transition-all">
                    <div className="w-8 h-8 bg-[#FEE2E2] rounded-lg flex items-center justify-center text-[#EF4444] shrink-0">
                      <FileText size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1D2939] truncate">{s.filename}</p>
                      <p className="text-[11px] text-[#667085]">
                        {s.course_code} • {s.course_name || ""} • {s.extracted_events_count || 0} events
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[#D1FAE5] text-[#065F46]">
                      Extracted
                    </span>
                    <button
                      onClick={() => handleRemoveSyllabus(s.id)}
                      className="text-[#9CA3AF] hover:text-[#EF4444] transition-colors ml-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="w-full flex flex-col gap-4">
          {/* AI Features */}
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-[#F59E0B]" />
              <h3 className="text-sm font-bold text-[#1D2939]">AI-Powered Extraction</h3>
            </div>
            <div className="flex flex-col gap-3">
              {AI_FEATURES.map((f, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-7 h-7 bg-[#EFF6FF] rounded-lg flex items-center justify-center text-[#3B82F6] shrink-0 mt-0.5">{f.icon}</div>
                  <div>
                    <p className="text-xs font-bold text-[#1D2939]">{f.title}</p>
                    <p className="text-[11px] text-[#667085] mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What happens next */}
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#1D2939] mb-4">What happens next?</h3>
            <div className="flex flex-col gap-3">
              {STEPS.map((s, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                  <p className="text-[11px] text-[#475569] leading-relaxed">{s}</p>
                </div>
              ))}
            </div>
            <button
              onClick={onComplete}
              className="mt-5 w-full border border-[#D0D5DD] text-[#344054] text-sm font-semibold rounded-xl py-2.5 hover:bg-[#F9FAFB] transition-all flex items-center justify-center gap-2"
            >
              Skip &amp; Go to Planner <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Tip bar */}
      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl px-5 py-3 flex items-center gap-3">
        <Sparkles size={15} className="text-[#3B82F6] shrink-0" />
        <p className="text-xs text-[#1E40AF]"><span className="font-bold">Tip:</span> For best results, upload the full syllabus. AI works best with complete course information including grading breakdowns, due dates, and instructor details.</p>
      </div>
    </div>
  );
}

import {
  Bookmark,
  Share2,
  CheckCircle,
} from "lucide-react";
import { studyNotes } from "./study-notes-dummy-data";

export default async function StudyNoteDetails({ params }) {
  const { studyslug } = await params;


  // using delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const slug = studyslug;

  const note = studyNotes.find(
    (item) => item.slug === slug
  );

  if (!note) {
    return (
      <div className="p-10 text-red-500 min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="bg-white p-8 rounded-2xl border border-red-100 shadow-sm text-center">
          <h2 className="text-2xl font-semibold mb-2">Note Not Found</h2>
          <p className="text-[#7A7A7A]">The study note you are looking for does not exist or has been moved.</p>
        </div>
      </div>
    );
  }

  // Helper to parse simple markdown to premium react layout line-by-line
  const renderFormattedContent = (content) => {
    if (!content) return null;

    // Check if content contains HTML tags
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(content);
    const isFullDocument = /<html/i.test(content) || /<!DOCTYPE/i.test(content);

    // Note: this is the main logic to render the content
    if (isHtml) {
      if (isFullDocument) {
        return (
          <iframe
            srcDoc={content}
            title="Interactive Study Note"
            className="w-full border-none min-h-200 rounded-xl"
            sandbox="allow-scripts allow-same-origin"
          />
        );
      } else {
        return (
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="study-notes-html-content"
          />
        );
      }
    }

    const lines = content.split('\n');
    const renderedElements = [];
    let currentList = [];

    const flushList = (key) => {
      if (currentList.length > 0) {
        renderedElements.push(
          <ul key={`list-${key}`} className="list-disc pl-6 mb-6 space-y-2.5 text-[#4A4A4A]">
            {currentList.map((item, idx) => (
              <li key={idx} className="leading-relaxed text-sm">
                {formatBoldText(item)}
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList(index);
        return;
      }

      // Check if heading
      if (trimmed.startsWith('###')) {
        flushList(index);
        const headingText = trimmed.replace(/^###\s*(\*\*)?/, '').replace(/(\*\*)?\s*$/, '');
        renderedElements.push(
          <h3 key={index} className="text-lg font-bold text-[#2C5F8D] mt-6 mb-3 border-b pb-1.5 border-slate-100 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#FF6B8A] rounded-full"></span>
            {headingText}
          </h3>
        );
      }
      // Check if list item
      else if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
        const cleanLine = trimmed.replace(/^[\*\-]\s*/, '');
        currentList.push(cleanLine);
      }
      // Normal paragraph
      else {
        flushList(index);
        renderedElements.push(
          <p key={index} className="text-[#4A4A4A] leading-relaxed text-sm mb-3">
            {formatBoldText(trimmed)}
          </p>
        );
      }
    });

    // Flush any remaining list items at the end
    flushList('final');

    return renderedElements;
  };

  // Helper to format bold text
  const formatBoldText = (text) => {
    if (!text.includes('**')) return text;

    const parts = text.split('**');
    return parts.map((part, idx) => {
      // Odd indices represent the text inside asterisks
      if (idx % 2 === 1) {
        return <strong key={idx} className="font-bold text-[#111827]">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="w-full">
      <div className="">

        {/* Top Buttons */}
        <div className="flex items-center justify-between">
          {/* breadcrumb */}
          <nav>
            <ol className="flex">
              <li>
                <a href="#" className="text-[#2C5F8D] hover:text-[#111827]">
                  Study Notes
                </a>
              </li>
              <li className="text-[#696868] pl-2"> (16 topics)</li>
              <li>
                <span className="mx-2 text-[#7A7A7A]">/</span>
              </li>
              <li>
                <span className="text-[#7A7A7A]">{note.title}</span>
              </li>
            </ol>
          </nav>
          {/* action buttons */}
          <div className="flex items-center gap-3 mb-6">
            <button className="px-4 py-2 rounded-lg bg-white border border-[#E5E7EB] flex items-center gap-2 text-sm text-[#4A4A4A] font-medium hover:bg-slate-50 transition cursor-pointer shadow-sm">
              <Bookmark className="w-4 h-4 text-[#7A7A7A]" />
              Save Notes
            </button>

            <button className="px-4 py-2 rounded-lg bg-white border border-[#E5E7EB] flex items-center gap-2 text-sm text-[#4A4A4A] font-medium hover:bg-slate-50 transition cursor-pointer shadow-sm">
              <Share2 className="w-4 h-4 text-[#7A7A7A]" />
              Share Notes
            </button>

            <button className="px-4 py-2 rounded-lg bg-[#FF6B8A] hover:bg-[#E05270] text-white flex items-center gap-2 text-sm font-semibold transition cursor-pointer shadow-sm">
              <CheckCircle className="w-4 h-4" />
              Mark Completed
            </button>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl p-8 border border-[#EEEEEE] shadow-sm">
          <h1 className="text-3xl font-extrabold text-[#111827] mb-6">
            {note?.title ?? "Not Found"}
          </h1>

          <div className="prose max-w-none">
            {renderFormattedContent(note?.content ?? "")}
          </div>
        </div>
      </div>
    </div>
  );
}
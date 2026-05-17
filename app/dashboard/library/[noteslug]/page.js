import LibraryItems from "./components/library-items";
import NoteHeader from "./components/note-header";
import NoteTag from "./components/note-tag";
import { ChevronRight, Share2, Pill } from "lucide-react";
import TopBreadcrumb from "./components/top-breadcrumb";
import NoteNotFound from "./components/note-not-found";

const notesData = [
  {
    id: 1,
    slug: "insulin-types",
    folder: "Pharmacology",
    title: "Insulin Types & Administration",
    date: "Jan 6, 2026",
    tags: [
      { label: "Endocrine", color: "blue" },
      { label: "Priority", color: "blue-gray" },
      { label: "Pharmacology", color: "orange" },
    ],
    items: [
      {
        title: "Rapid-Acting (Lispro/Aspart)",
        desc: "15min onset, give within 15min of meals.",
      },
      {
        title: "Regular",
        desc: "30–60min onset, give 30min before meals. Only insulin given IV.",
      },
      {
        title: "NPH",
        desc: "Cloudy. Draw clear before cloudy when mixing.",
      },
      {
        title: "Glargine",
        desc: "No peak, 24h duration. Cannot be mixed with anything.",
      },
    ],
  },
  {
    id: 2,
    slug: "anticoagulants",
    folder: "Pharmacology",
    title: "Anticoagulants — Heparin vs Warfarin",
    date: "Jan 7, 2026",
    tags: [
      { label: "Cardiovascular", color: "blue" },
      { label: "Critical", color: "blue-gray" },
      { label: "Pharmacology", color: "orange" },
    ],
    items: [
      {
        title: "Heparin",
        desc: "Rapid onset, short half-life. Monitor aPTT.",
      },
      {
        title: "Warfarin",
        desc: "Slow onset (days), long duration. Monitor PT/INR. Vitamin K is antidote.",
      },
    ],
  },
  {
    id: 3,
    slug: "heart-structure",
    folder: "Anatomy",
    title: "Heart Structure",
    date: "Jan 8, 2026",
    tags: [
      { label: "Cardiovascular", color: "blue" },
      { label: "Foundations", color: "blue-gray" },
      { label: "Anatomy", color: "orange" },
    ],
    items: [
      {
        title: "Atria",
        desc: "Upper chambers that receive blood.",
      },
      {
        title: "Ventricles",
        desc: "Lower chambers that pump blood out.",
      },
    ],
  },
];

export default async function NoteDetails({ params }) {
  const { noteslug } = await params;

  // skeleton loading delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const note = notesData.find((n) => n.slug === noteslug);

  if (!note) return <NoteNotFound />;

  return (
    <div className="flex flex-col h-full">
      {/* Top Breadcrumb Header */}
      <TopBreadcrumb note={note} />

      {/* Content Area */}
      <div className="pt-6">
        <NoteHeader folder={note.folder} date={note.date} title={note.title} />

        <div className="flex gap-2 mb-8">
          {note.tags.map((tag, index) => (
            <NoteTag key={index} label={tag.label} color={tag.color} />
          ))}
        </div>

        <div className="space-y-6">
          {note.items.map((item, index) => (
            <LibraryItems key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

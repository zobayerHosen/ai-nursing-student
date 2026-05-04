const notesData = [
  {
    id: 1,
    slug: "insulin-types",
    title: "Insulin Types",
    desc: "Rapid-Acting (Lispro/Aspart): 15min onset...",
  },
  {
    id: 2,
    slug: "anticoagulants",
    title: "Anticoagulants",
    desc: "Mechanism and uses...",
  },
  { id: 3, slug: "heart-structure", title: "Heart Structure", desc: "Basic anatomy..." },
];


export default async function NoteDetails({ params }) {
  const { noteslug } = await params;
  const note = notesData.find((n) => n.slug === noteslug);

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
      <p className="text-gray-600">{note.desc}</p>
    </div>
  );
}

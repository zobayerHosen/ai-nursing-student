import NoteDetailsClient from "./components/note-details-client";

export default async function NoteDetailsPage({ params }) {
  const resolvedParams = await params;
  const noteslug = resolvedParams?.noteslug;

  return (
    <div>
      <NoteDetailsClient noteslug={noteslug} />
    </div>
  );
}

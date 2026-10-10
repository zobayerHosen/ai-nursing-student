import DectListClient from "./components/dect-list-client";

export const metadata = {
  title: "Flashcard Decks | STEMRN",
  description: "Browse and study interactive nursing flashcard decks by topic.",
};

export default async function DectListPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.dectlist;

  return <DectListClient id={id} />;
}
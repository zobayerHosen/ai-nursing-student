import FlaschCardPlayerDetails from "./components/flashcard-player-details";

export default async function CategoryPage({ params }) {
  const { topic: id } = await params;

  return (
    <>
      <FlaschCardPlayerDetails topicList={id} />
    </>
  );
}

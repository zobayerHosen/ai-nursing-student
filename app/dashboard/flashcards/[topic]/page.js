import TopicList from "./components/topic-list";

export default async function CategoryPage({ params }) {
  const { topic: id } = await params;

  return (
    <>
      <TopicList topicList={id} />
    </>
  );
}

import TopicList from "./components/topic-list";

export default async function CategoryPage({ params }) {
  const { topic: slug } = await params;

  return (
    <>
      <TopicList topicList={slug} />
    </>
  );
}

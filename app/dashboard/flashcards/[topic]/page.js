import TopicList from "./components/topic-list";

export default async function CategoryPage({ params }) {
  const { topic: slug } = await params;

  // loading delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    <>
      <TopicList topicList={slug} />
    </>
  );
}

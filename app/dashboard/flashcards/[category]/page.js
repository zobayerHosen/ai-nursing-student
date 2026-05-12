export default async function CategoryPage({ params }) {
  const { category: slug } = await params;

  return <div>{slug}</div>;
}

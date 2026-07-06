import BodySystemClient from "./components/body-system-client";

export default async function BodySystemsPage({ params }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.slug);

  return <BodySystemClient id={id} />;
}
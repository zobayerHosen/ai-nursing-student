import DrugCardDetails from "../components/drug-card-details";

export default async function DrugCardDetailsPage({ params }) {
    const { id } = await params;
    return <DrugCardDetails id={id} />;
}

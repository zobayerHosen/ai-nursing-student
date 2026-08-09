import CarePlanBuilderDetails from "../components/care-plan-builder-details";

export default async function CarePlanBuilderDetailsPage({ params }) {
    const { id } = await params;
    return <CarePlanBuilderDetails id={id} />;
}

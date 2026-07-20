import CarePlanBuilderDetails from "../components/care-plan-builder-details";

export default function CarePlanBuilderDetailsPage({ params }) {
    // In a real app, you would fetch data for params.id here.
    return <CarePlanBuilderDetails id={params.id} />;
}

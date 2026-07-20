import CarePlanBuildersLayoutClient from "./components/care-plan-builders-layout-client";

export const metadata = {
    title: "Care Plan Builder | Stemrn",
    description: "AI-Powered Care Plan Builder for nursing students.",
};

export default function CarePlanBuildersLayout({ children }) {
    return <CarePlanBuildersLayoutClient>{children}</CarePlanBuildersLayoutClient>;
}

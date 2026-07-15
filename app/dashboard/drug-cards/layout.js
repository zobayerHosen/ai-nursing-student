import DrugCardsLayoutClient from "./components/drug-cards-layout-client";

export const metadata = {
    title: "Drug Cards | Stemrn",
    description: "AI-Powered Drug Cards for nursing students.",
};

export default function DrugCardsLayout({ children }) {
    return <DrugCardsLayoutClient>{children}</DrugCardsLayoutClient>;
}
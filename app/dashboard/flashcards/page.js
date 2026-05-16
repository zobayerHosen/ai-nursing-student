"use client";

import { useSearchParams } from "next/navigation";
import EmptyCategorySelect from "./components/empty-category-select";
import ProgressView from "./components/progress-view";

const FlashCardsPage = () => {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");

    if (tab === "progress") {
        return (
            <section className="w-full">
                <ProgressView />
            </section>
        );
    }

    return (
        <section className="overflow-hidden min-h-[80vh] flex items-center justify-center">
            <EmptyCategorySelect />
        </section>
    );
};
export default FlashCardsPage;
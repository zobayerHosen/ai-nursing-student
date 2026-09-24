import { Suspense } from "react";
import CategoryDetailContent from "./category-detail-content";

export default async function CategoryDetailPage({ params }) {
    const resolvedParams = await params;
    const categoryId = resolvedParams?.categoryId;

    return (
        <Suspense fallback={<div className="w-full min-h-screen bg-[#f8fafc]" />}>
            <CategoryDetailContent categoryId={categoryId} params={resolvedParams} />
        </Suspense>
    );
}
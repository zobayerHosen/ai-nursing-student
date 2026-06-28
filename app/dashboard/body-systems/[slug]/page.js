"use client";

import React, { use } from "react";
import BodySystemDetails from "./components/body-system-detail";
import { useLearningCategoryDetails } from "@/hooks";
import { notFound } from "next/navigation";

const BodySystemsPage = ({ params }) => {
  const unwrappedParams = use(params);
  const id = Number(unwrappedParams.slug);

  const { learningCategoryDetailsData, isLoading } = useLearningCategoryDetails(id);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8F9FA]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const systemData = learningCategoryDetailsData;

  if (!systemData) {
    notFound();
  }

  return <BodySystemDetails systemData={systemData} />;
};

export default BodySystemsPage;
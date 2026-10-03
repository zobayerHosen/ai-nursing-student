"use client";

import React from "react";
import BodySystemDetails from "./body-system-detail";
import { useGetCoreLearningContentDetails } from "@/hooks";
import { notFound } from "next/navigation";

const BodySystemClient = ({ id }) => {
  const { topicDetailsData, isLoading } = useGetCoreLearningContentDetails(id);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8F9FA]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!topicDetailsData) {
    notFound();
  }

  return <BodySystemDetails systemData={topicDetailsData} />;
};
export default BodySystemClient;
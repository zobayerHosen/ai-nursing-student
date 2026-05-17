"use client";

import React, { use } from "react"; // 1. Import the 'use' hook
import BodySystemDetails from "./components/body-system-detail";
import body_system_detail_data from "./components/body-system-details-data";
import { notFound } from "next/navigation";

// Next.js automatically passes params as a Promise prop
const BodySystemsPage = ({ params }) => {
  // 2. Unwrap the params Promise using React.use()
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  // 3. Find your system data using the unwrapped slug
  const systemData = body_system_detail_data.find((item) => item.slug === slug);

  if (!systemData) {
    notFound();
  }

  return <BodySystemDetails systemData={systemData} />;
};

export default BodySystemsPage;
import NclexClient from "./components/nclex-client";

export const metadata = {
  title: "NCLEX Practice Tests | STEMRN",
  description: "Practice NCLEX exams with comprehensive question bank and Next-Gen NCLEX RN simulator",
};

export default function NclexExamPage() {
  return <NclexClient />;
}
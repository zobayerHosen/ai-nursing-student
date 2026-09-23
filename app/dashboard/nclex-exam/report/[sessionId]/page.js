import ReportClient from "./components/report-client";

export const metadata = {
  title: "NCLEX Exam Report & Review | STEMRN",
  description: "Detailed performance report, clinical reasoning, and question review for your NCLEX simulation session.",
};

export default function NclexReportPage() {
  return <ReportClient />;
}

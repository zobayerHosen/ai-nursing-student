import QbankClient from "./components/qbank-client";

export const metadata = {
  title: "NCLEX QBank Practice Exams | STEMRN",
  description: "Take full Next-Gen NCLEX RN simulated exams with comprehensive simulated question banks",
};

export default function QbankPage() {
  return <QbankClient />;
}

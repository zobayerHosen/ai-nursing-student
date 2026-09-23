import QbankSessionClient from "./components/qbank-session-client";

export const metadata = {
  title: "Practice Session | NCLEX QBank | STEMRN",
  description: "Next-Gen NCLEX Practice Session with targeted clinical questions and rationales",
};

export default function QbankSessionPage() {
  return <QbankSessionClient />;
}

import SessionClient from "./components/session-client";

export const metadata = {
  title: "NCLEX Exam Session | STEMRN",
  description: "Next-Gen NCLEX Simulation Exam Session with active timer and question interface.",
};

export default function NclexSessionPage() {
  return <SessionClient />;
}

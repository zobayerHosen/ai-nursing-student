"use client";

import { Award, CheckCircle2, AlertCircle, RotateCcw } from "lucide-react";

function calculateCorrectLocal(questions, userAnswers) {
  let count = 0;
  questions.forEach((q, idx) => {
    const uAns = userAnswers[idx];
    const cAns = q.answer || q.answers;
    if (isAnswerCorrect(uAns, cAns)) count++;
  });
  return count;
}

function isAnswerCorrect(userAns, correctAns) {
  if (!userAns) return false;
  if (Array.isArray(userAns) && Array.isArray(correctAns)) {
    return (
      userAns.length === correctAns.length &&
      userAns.every((val) => correctAns.includes(val))
    );
  }
  return String(userAns).trim().toLowerCase() === String(correctAns).trim().toLowerCase();
}

function formatAnsDisplay(ans) {
  if (Array.isArray(ans)) return ans.join(", ");
  if (ans === undefined || ans === null) return "";
  return String(ans);
}

export default function ScoreOverviewScreen({
  questions = [],
  userAnswers = {},
  scoreData = null,
  isLoadingScore = false,
  onRestart,
  isRestarting = false,
  onNewQuiz,
}) {
  const total = scoreData?.total_questions ?? questions.length;
  const correct =
    scoreData?.correct_count ?? calculateCorrectLocal(questions, userAnswers);
  const incorrect = scoreData?.incorrect_count ?? Math.max(total - correct, 0);
  const answered =
    scoreData?.answered_count ?? Object.keys(userAnswers).length;
  const scorePercent =
    scoreData?.score_percentage !== undefined
      ? Math.round(scoreData.score_percentage)
      : total > 0
      ? Math.round((correct / total) * 100)
      : 0;
  const isPassed = scoreData?.passed ?? scorePercent >= 70;

  const reviewList =
    Array.isArray(scoreData?.breakdown) && scoreData.breakdown.length > 0
      ? scoreData.breakdown
      : questions.map((q, idx) => ({
          question_index: idx,
          question: q.question,
          user_answer: userAnswers[idx],
          correct_answer: q.answer || q.answers,
          is_correct: isAnswerCorrect(userAnswers[idx], q.answer || q.answers),
          explanation: q.explanation,
        }));

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
      {/* Score Header Banner */}
      <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xs border border-[#E5E7EB] text-center space-y-4">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F2FC] text-[#2C5F8D]">
          <Award size={40} />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B]">Exam Results</h2>
        <div className="flex items-center justify-center gap-3">
          <span className="text-4xl font-extrabold text-[#1E4E79]">
            {scorePercent}%
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              isPassed
                ? "bg-[#D1FAE5] text-[#065F46]"
                : "bg-[#FEE2E2] text-[#991B1B]"
            }`}
          >
            {isPassed ? "PASSED" : "NEEDS IMPROVEMENT"}
          </span>
        </div>

        {/* Breakdown Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#F1F5F9]">
          <div className="rounded-xl bg-[#F8FAFC] p-3 text-center">
            <p className="text-[11px] font-semibold text-[#64748B]">
              Total Questions
            </p>
            <p className="text-lg font-bold text-[#1E293B] mt-1">{total}</p>
          </div>
          <div className="rounded-xl bg-[#ECFDF5] p-3 text-center">
            <p className="text-[11px] font-semibold text-[#047857]">Correct</p>
            <p className="text-lg font-bold text-[#065F46] mt-1">{correct}</p>
          </div>
          <div className="rounded-xl bg-[#FEF2F2] p-3 text-center">
            <p className="text-[11px] font-semibold text-[#B91C1C]">
              Incorrect
            </p>
            <p className="text-lg font-bold text-[#991B1B] mt-1">{incorrect}</p>
          </div>
          <div className="rounded-xl bg-[#F8FAFC] p-3 text-center">
            <p className="text-[11px] font-semibold text-[#64748B]">Answered</p>
            <p className="text-lg font-bold text-[#1E293B] mt-1">{answered}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            disabled={isRestarting}
            onClick={onRestart}
            className="flex h-10 items-center gap-2 rounded-xl bg-[#1E4E79] px-5 text-xs font-semibold text-white hover:bg-[#143756] transition cursor-pointer disabled:opacity-50"
          >
            <RotateCcw size={15} />
            {isRestarting ? "Restarting..." : "Retake Quiz"}
          </button>
          <button
            type="button"
            onClick={onNewQuiz}
            className="flex h-10 items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 text-xs font-semibold text-[#334155] hover:bg-[#F8FAFC] transition cursor-pointer"
          >
            Generate New Quiz
          </button>
        </div>
      </div>

      {/* Detailed Question Review */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#1E293B]">Question Review</h3>
        {reviewList.map((item, idx) => {
          const isItemCorrect =
            item.is_correct ??
            isAnswerCorrect(item.user_answer, item.correct_answer);
          const qText = item.question;
          const uAns = item.user_answer;
          const cAns = item.correct_answer;
          const exp = item.explanation;
          const qNum =
            (item.question_index !== undefined ? item.question_index : idx) + 1;

          return (
            <div
              key={idx}
              className={`rounded-xl bg-white p-5 border shadow-xs space-y-3 ${
                isItemCorrect ? "border-[#A7F3D0]" : "border-[#FECACA]"
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#1E293B]">Question {qNum}</span>
                <span
                  className={`flex items-center gap-1 font-semibold ${
                    isItemCorrect ? "text-success" : "text-[#DC2626]"
                  }`}
                >
                  {isItemCorrect ? (
                    <CheckCircle2 size={15} />
                  ) : (
                    <AlertCircle size={15} />
                  )}
                  {isItemCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium text-[#1E293B]">
                {qText}
              </p>

              <div className="text-xs space-y-1 text-[#475569] bg-[#F8FAFC] p-3 rounded-lg">
                <p>
                  <span className="font-semibold">Your Answer:</span>{" "}
                  {formatAnsDisplay(uAns) || "None"}
                </p>
                <p>
                  <span className="font-semibold text-success">
                    Correct Answer:
                  </span>{" "}
                  {formatAnsDisplay(cAns)}
                </p>
                {exp && (
                  <p className="pt-1 text-[#64748B]">
                    <span className="font-semibold">Rationale:</span> {exp}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

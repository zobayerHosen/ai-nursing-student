"use client";

import { FULL_EXAMS, SAMPLE_QUESTIONS, scoreColor } from "./data";

export default function FullNCLEXSection({ onStartExam, consumedExams }) {
  return (
    <div className="flex-1 overflow-auto p-7 xl:p-8">
      <div className="max-w-[720px] mx-auto">
        <div className="mb-6">
          <h2 className="text-[22px] font-extrabold text-[#0f172a] tracking-tight mb-1.5">
            Next-Gen NCLEX RN Simulator
          </h2>
          <p className="text-sm text-[#64748b]">
            85-question simulated NCLEX exams under timed conditions (2h 30min).{" "}
            <strong>Each exam can be taken only once</strong> — after you finish and review your
            answers, the exam is permanently locked.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FULL_EXAMS.map((exam, i) => {
            const isConsumed = !!(consumedExams && consumedExams[exam.id]);
            const locked = exam.status === "locked" || isConsumed;
            const completed = exam.status === "completed" && !isConsumed;
            const available = exam.status === "available" && !isConsumed;

            return (
              <div
                key={exam.id}
                className="bg-white border border-[#e5e7eb] rounded-xl p-4 transition-all"
                style={{
                  opacity: exam.status === "locked" ? 0.6 : 1,
                  animation: `fadeUp 0.3s ease ${i * 0.06}s both`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{
                      background: isConsumed
                        ? "#f1f5f9"
                        : completed
                        ? "#dcfce7"
                        : available
                        ? "#dbeafe"
                        : "#f1f5f9",
                    }}
                  >
                    {isConsumed ? "🔒" : completed ? "✓" : available ? "▶" : "🔒"}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className="text-[15px] font-bold text-[#1e293b]">{exam.title}</div>
                      {!isConsumed && exam.tag && (
                        <span className="px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] text-[10px] font-bold">
                          {exam.tag}
                        </span>
                      )}
                      {isConsumed && (
                        <span className="px-2 py-0.5 rounded-full bg-[#fee2e2] text-[#991b1b] text-[10px] font-bold">
                          Locked
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#94a3b8]">
                      {exam.subtitle} · {exam.questions} questions · {exam.minutes} min ·{" "}
                      {exam.difficulty}
                    </div>
                    {completed && (
                      <div className="text-xs text-[#64748b] mt-0.5">
                        Completed {exam.completedDate}
                      </div>
                    )}
                    {isConsumed && (
                      <div className="text-xs text-[#94a3b8] mt-0.5">
                        You&apos;ve already completed and reviewed this exam.
                      </div>
                    )}
                  </div>

                  {isConsumed ? (
                    <span className="text-xs text-[#94a3b8]">Locked</span>
                  ) : completed ? (
                    <div className="text-center shrink-0">
                      <div
                        className="text-[22px] font-extrabold"
                        style={{ color: scoreColor(exam.score) }}
                      >
                        {exam.score}%
                      </div>
                      <div className="text-[11px] text-[#94a3b8] mt-0.5">Score</div>
                    </div>
                  ) : available ? (
                    <button
                      onClick={() =>
                        onStartExam(SAMPLE_QUESTIONS, "test", exam.title, {
                          examId: exam.id,
                          isFullExam: true,
                        })
                      }
                      className="bg-[#1E3A5F] text-white border-none rounded-lg px-5 py-2 font-sans text-[13px] font-semibold cursor-pointer transition-all inline-flex items-center gap-1.5 hover:bg-[#162d4a]"
                    >
                      Start Exam →
                    </button>
                  ) : (
                    <span className="text-xs text-[#94a3b8]">Locked</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

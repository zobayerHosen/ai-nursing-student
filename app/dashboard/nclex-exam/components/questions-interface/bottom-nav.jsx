"use client";

import { useRouter } from "next/navigation";
import { usePauseExam, useResumeExam } from "@/hooks";
import toast from "react-hot-toast";
import { hasValidSelection } from "./question-renderers";

export function PauseOverlay({ isResumingExam, isPausingExam, onResume, onEnd }) {
  return (
    <div
      className="absolute top-0 inset-0 z-300 flex items-center justify-center backdrop-blur-md"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.75)" }}
    >
      <div className="text-center p-8 rounded-2xl max-w-md w-full mx-4" style={{ animation: "scaleIn 0.2s ease" }}>
        <div className="text-2xl font-extrabold text-white mb-1.5 font-serif">Exam Paused</div>
        <div className="text-sm text-[#cbd5e1] mb-6 leading-relaxed">
          The exam timer is frozen. Click Start when you&apos;re ready to continue.
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onResume}
            disabled={isResumingExam}
            className="w-full sm:w-auto min-w-37.5 bg-[#FE5E7E] hover:bg-[#e04d6c] text-white border-none rounded-lg px-8 py-3 font-sans text-sm font-bold cursor-pointer inline-flex items-center justify-center gap-2 tracking-wide transition-all shadow-lg active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isResumingExam ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Resuming...</span>
              </>
            ) : (
              <>
                <span className="text-sm">▶</span>
                <span>Start</span>
              </>
            )}
          </button>
          <button
            onClick={onEnd}
            disabled={isPausingExam || isResumingExam}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg px-5 py-3 font-sans text-sm font-semibold cursor-pointer inline-flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            End & Exit
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BottomNav({
  mode,
  current,
  totalQuestions,
  q,
  selected,
  isAnswered,
  isSubmitting,
  isFinishing,
  paused,
  setPaused,
  sessionId,
  isQBank,
  setCurrent,
  setAnswers,
  setRevealed,
  lockTestAnswer,
  submitCurrentAnswer,
  onSubmitAnswer,
  handleFinish,
}) {
  const router = useRouter();
  const { pauseExam, isPending: isPausingExam } = usePauseExam();
  const { resumeExam, isPending: isResumingExam } = useResumeExam();

  // End exam (pauses session if in exam mode and navigates back to dashboard)
  const handleEndExam = async () => {
    if (isQBank) {
      router.push("/dashboard/qbank");
      return;
    }
    if (!sessionId) {
      router.push("/dashboard/nclex-exam");
      return;
    }
    try {
      await pauseExam(sessionId);
      toast.success("Exam paused successfully");
      router.push("/dashboard/nclex-exam");
    } catch (err) {
      toast.error("Failed to pause exam");
      router.push("/dashboard/nclex-exam");
    }
  };

  // Paused exam (pauses session, freezes state, does NOT navigate)
  const handlePausedExam = async () => {
    if (isPausingExam) return;
    try {
      if (sessionId) {
        await pauseExam(sessionId);
        toast.success("Exam paused successfully");
      }
      setPaused(true);
    } catch (err) {
      toast.error("Failed to pause exam");
      setPaused(true);
    }
  };

  // Resume exam
  const handleResumeExam = async () => {
    if (isResumingExam) return;
    try {
      if (sessionId) {
        await resumeExam(sessionId);
        toast.success("Exam resumed successfully");
      }
      setPaused(false);
    } catch (err) {
      toast.error("Failed to resume exam");
    }
  };

  const handlePrevious = async () => {
    if (isSubmitting || isFinishing) return;
    if (mode === "test") {
      await lockTestAnswer(Math.max(0, current - 1));
    } else {
      setCurrent((c) => Math.max(0, c - 1));
    }
  };

  const handleNext = async () => {
    if (isSubmitting || isFinishing) return;
    if (mode === "test") {
      if (current < totalQuestions - 1) {
        await lockTestAnswer(current + 1);
      } else {
        if (selected !== null && selected !== undefined) {
          if (onSubmitAnswer) {
            await submitCurrentAnswer(selected, current);
          }
          setAnswers((a) => ({ ...a, [current]: selected }));
        }
        await handleFinish();
      }
    } else {
      if (!isAnswered) {
        const { canSubmit } = hasValidSelection(q, selected);
        if (canSubmit) {
          if (onSubmitAnswer) {
            await submitCurrentAnswer(selected, current);
          }
          setRevealed(true);
          setAnswers((a) => ({ ...a, [current]: selected }));
        } else {
          return;
        }
      } else {
        if (current < totalQuestions - 1) setCurrent((c) => c + 1);
        else await handleFinish();
      }
    }
  };

  return (
    <>
      {/* Bottom nav */}
      <div className="bg-[#0f3a5f] text-white h-8.5 flex items-stretch justify-between shrink-0 z-11 font-sans text-[13px]">
        {/* End button */}
        <div className="flex items-stretch">
          <button
            onClick={handleEndExam}
            disabled={isPausingExam}
            className="flex items-center gap-1.5 px-3.5 border-none bg-transparent text-white cursor-pointer text-[13px] font-normal font-sans transition-all h-full disabled:opacity-50"
            style={{ borderRight: "1px solid rgba(255,255,255,0.18)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <path d="M16 17l5-5-5-5" /><line x1="21" y1="12" x2="9" y2="12" /><path d="M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
            </svg>
            <span><u>E</u>nd</span>
          </button>

          {/* paused button */}
          {mode === "test" && (
            <button
              onClick={async () => {
                if (paused) {
                  await handleResumeExam();
                } else {
                  await handlePausedExam();
                }
              }}
              disabled={isPausingExam || isResumingExam}
              className="flex items-center gap-1.5 px-3.5 border-none cursor-pointer text-[13px] font-normal font-sans transition-all h-full disabled:opacity-60"
              style={{
                borderRight: "1px solid rgba(255,255,255,0.18)",
                background: paused ? "rgba(252,211,77,0.18)" : "transparent",
                color: paused ? "#fde047" : "white",
              }}
            >
              {isPausingExam || isResumingExam ? (
                <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
              ) : paused ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="shrink-0">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <line x1="9" y1="4" x2="9" y2="20" /><line x1="15" y1="4" x2="15" y2="20" />
                </svg>
              )}
              <span><u>{paused ? "R" : "P"}</u>{paused ? "esume" : "ause"}</span>
            </button>
          )}
        </div>

        {/* Previous & Next buttons */}
        <div className="flex items-stretch">
          <button
            onClick={handlePrevious}
            disabled={current === 0 || isSubmitting || isFinishing}
            className="flex items-center gap-1.5 px-3.5 border-none bg-transparent text-[13px] font-normal font-sans transition-all h-full"
            style={{
              borderLeft: "1px solid rgba(255,255,255,0.18)",
              color: "white",
              opacity: current === 0 || isSubmitting || isFinishing ? 0.4 : 1,
              cursor: current === 0 || isSubmitting || isFinishing ? "not-allowed" : "pointer",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            <span><u>P</u>revious</span>
          </button>
          <button
            disabled={isSubmitting || isFinishing}
            onClick={handleNext}
            className={`flex items-center gap-1.5 px-3.5 border-none bg-transparent text-white text-[13px] font-normal font-sans transition-all h-full ${
              isSubmitting || isFinishing ? "opacity-75 cursor-not-allowed" : "cursor-pointer hover:bg-white/10"
            }`}
            style={{ borderLeft: "1px solid rgba(255,255,255,0.18)" }}
          >
            {isSubmitting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                <span>Saving...</span>
              </>
            ) : isFinishing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                <span>Completing...</span>
              </>
            ) : current < totalQuestions - 1 ? (
              <>
                <span><u>N</u>ext</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            ) : (
              <>
                <span><u>F</u>inish</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pause overlay */}
      {paused && mode === "test" && (
        <PauseOverlay
          isResumingExam={isResumingExam}
          isPausingExam={isPausingExam}
          onResume={handleResumeExam}
          onEnd={handleEndExam}
        />
      )}
    </>
  );
}

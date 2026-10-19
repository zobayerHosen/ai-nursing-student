"use client";

import { RationaleBlock, QuestionStats } from "../sub-components";
import {
  hasValidSelection,
  PeerSolveBadge,
  QuestionTypeLabel,
  InstructionBar,
  ClozeRenderer,
  OrderRenderer,
  HighlightRenderer,
  MatrixRenderer,
  FillBlankRenderer,
  StandardOptionsRenderer,
  ResultBanner,
} from "./question-renderers";

export default function SplitLayout({
  questions,
  current,
  q,
  mode,
  isTutorial,
  isQBank,
  selected,
  setSelected,
  answers,
  setAnswers,
  flagged = {},
  revealed,
  setRevealed,
  showNav,
  isSubmitting,
  setIsSubmitting,
  backendFeedback,
  finished,
  localIsAnswerScored,
  localGetCredit,
  getQbankCorrectIndices,
  lockTestAnswer,
  setCurrent,
  submitCurrentAnswer,
  onSubmitAnswer,
}) {
  if (!q) return null;

  const isAnswered = answers[current] !== undefined;
  const userAnswer = answers[current];
  const isCorrectAns = localIsAnswerScored(q, userAnswer);
  const currentFeedback = backendFeedback?.[q?.id] || backendFeedback?.[q?.question_id];

  const handleSelect = async (i) => {
    if (isTutorial && answers[current] !== undefined) return;
    if (q.multiSelect || q.type === "extended-multi" || q.type === "multiple" || q.type === "highlight") {
      const cur = Array.isArray(selected) ? selected : [];
      const next = cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i].sort((a, b) => a - b);
      setSelected(next);
    } else {
      setSelected(i);
    }
  };

  const handleMatrixSelect = (rowIdx, colIdx) => {
    if (isTutorial && answers[current] !== undefined) return;
    const cur = Array.isArray(selected) ? [...selected] : new Array(q.matrixRows?.length || 0).fill(undefined);
    cur[rowIdx] = colIdx;
    setSelected(cur);
  };

  const handleClozeSelect = (blankIdx, optionIdx) => {
    if (isTutorial && answers[current] !== undefined) return;
    const cur = Array.isArray(selected) ? [...selected] : new Array(q.clozeBlanks?.length || 0).fill(undefined);
    cur[blankIdx] = optionIdx;
    setSelected(cur);
  };

  const handleSubmitTutorialAnswer = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (onSubmitAnswer) {
        await submitCurrentAnswer(selected, current);
      }
      setRevealed(true);
      setAnswers((a) => ({ ...a, [current]: selected }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex-1 flex overflow-hidden">
      {/* Left - Question */}
      <div className="flex-1 overflow-auto p-5 xl:p-6 min-w-0" style={{ borderRight: revealed ? "1px solid #e2e8f0" : "none" }}>
        <div className="max-w-230" style={{ animation: "fadeUp 0.25s ease" }}>
          {/* Tags */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-[13px] text-[#94a3b8] font-semibold">Q{current + 1}</span>
            <span className="w-1 h-1 rounded-full bg-[#cbd5e1]" />
            {(q.category || q.topic) && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#eef4fb] text-[#2C5F8D] text-[11px] font-bold">
                {q.category || q.topic}
              </span>
            )}
            {q.subtopic && q.subtopic !== (q.category || q.topic) && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] text-[11px] font-medium">
                {q.subtopic}
              </span>
            )}
            <span
              className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
              style={{
                background: q.difficulty === "beginner" ? "#dcfce7" : q.difficulty === "advanced" ? "#fee2e2" : "#fef3c7",
                color: q.difficulty === "beginner" ? "#166534" : q.difficulty === "advanced" ? "#991b1b" : "#92400e",
              }}
            >
              {q.difficulty ? (q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)) : "Intermediate"}
            </span>
            <QuestionTypeLabel question={q} />
            <span className="text-[10px] text-[#cbd5e1] ml-auto">{q.nclexCategory || q.client_needs}</span>
          </div>

          {/* Clinical Case / Patient Scenario (if present) */}
          {q.passage && q.type !== "highlight" && (
            <div className="mb-4.5 p-4 sm:p-5 bg-white border border-[#e2e8f0] rounded-xl shadow-xs">
              <div className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1E3A5F]" />
                Clinical Case / Patient Scenario
              </div>
              <div className="text-[14px] text-[#334155] leading-relaxed whitespace-pre-line">
                {q.passage}
              </div>
            </div>
          )}

          {/* Question stem */}
          <div className="text-[15.5px] font-medium text-[#0f172a] leading-relaxed mb-4 tracking-tight">
            {q.question}
          </div>

          {/* Instruction bar for special types */}
          <InstructionBar question={q} />

          {/* Question Renderers */}
          {q.type === "cloze" ? (
            <ClozeRenderer
              q={q}
              selected={selected}
              userAnswer={userAnswer}
              isAnswered={isAnswered}
              isTutorial={isTutorial}
              onClozeSelect={handleClozeSelect}
            />
          ) : q.type === "order" ? (
            <OrderRenderer
              q={q}
              selected={selected}
              userAnswer={userAnswer}
              isAnswered={isAnswered}
              isTutorial={isTutorial}
              isQBank={isQBank}
              getQbankCorrectIndices={getQbankCorrectIndices}
              setSelected={setSelected}
            />
          ) : q.type === "highlight" ? (
            <HighlightRenderer
              q={q}
              selected={selected}
              userAnswer={userAnswer}
              isAnswered={isAnswered}
              isTutorial={isTutorial}
              isQBank={isQBank}
              getQbankCorrectIndices={getQbankCorrectIndices}
              setSelected={setSelected}
            />
          ) : q.type === "matrix" ? (
            <MatrixRenderer
              q={q}
              selected={selected}
              userAnswer={userAnswer}
              isAnswered={isAnswered}
              isTutorial={isTutorial}
              onMatrixSelect={handleMatrixSelect}
            />
          ) : q.type === "fill-blank" || q.type === "input" ? (
            <FillBlankRenderer
              q={q}
              selected={selected}
              userAnswer={userAnswer}
              isAnswered={isAnswered}
              isTutorial={isTutorial}
              isQBank={isQBank}
              backendFeedback={backendFeedback}
              setSelected={setSelected}
              onSubmitAnswer={onSubmitAnswer}
              submitCurrentAnswer={submitCurrentAnswer}
              current={current}
              setRevealed={setRevealed}
              setAnswers={setAnswers}
            />
          ) : (
            <StandardOptionsRenderer
              q={q}
              selected={selected}
              userAnswer={userAnswer}
              isAnswered={isAnswered}
              isTutorial={isTutorial}
              isQBank={isQBank}
              getQbankCorrectIndices={getQbankCorrectIndices}
              onSelect={handleSelect}
            />
          )}

          {/* Peer solve percentage for QBank after answer is submitted */}
          {isQBank && isAnswered && (isTutorial || finished) && (
            <PeerSolveBadge feedback={currentFeedback} question={q} className="mt-4 mb-2 animate-[fadeIn_0.2s_ease-out]" />
          )}

          {/* Stats for non-QBank */}
          {isTutorial && isAnswered && !isQBank && <QuestionStats question={q} backendFeedback={backendFeedback} />}

          {/* Submit button in tutorial/practice mode */}
          {(() => {
            if (!isTutorial || finished || isAnswered) return null;
            const { canSubmit, needsAll, needLabel } = hasValidSelection(q, selected);
            if (!canSubmit && !needsAll) return null;
            return (
              <div className="flex justify-center mt-4.5 pt-4.5 border-t border-[#f1f5f9] gap-3 items-center">
                {needsAll && (
                  <span className="text-xs text-amber-600 font-semibold">{needLabel}</span>
                )}
                {canSubmit && (
                  <button
                    disabled={isSubmitting}
                    onClick={handleSubmitTutorialAnswer}
                    className={`bg-[#2C5F8D] text-white border-none rounded-lg px-7 py-2.5 font-sans text-[13px] font-bold inline-flex items-center gap-2 tracking-wide transition-all ${
                      isSubmitting ? "opacity-75 cursor-not-allowed" : "cursor-pointer hover:bg-[#1e4773]"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0"></span>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Answer</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Right - Rationale panel */}
      {revealed && isTutorial && (
        <div
          className="w-110 shrink-0 flex flex-col bg-white overflow-hidden animate-[slideInRight_0.25s_ease]"
          style={{ borderLeft: "1px solid #e2e8f0" }}
        >
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Result banner */}
            <ResultBanner
              q={q}
              isCorrectAns={isCorrectAns}
              credit={localGetCredit(q, userAnswer)}
              isQBank={isQBank}
              backendFeedback={backendFeedback}
              getQbankCorrectIndices={getQbankCorrectIndices}
            />

            {/* Rationale */}
            <div className="flex-1 overflow-auto p-4">
              <RationaleBlock question={q} userAnswer={userAnswer} isQBank={isQBank} backendFeedback={backendFeedback} />
            </div>
          </div>
        </div>
      )}

      {/* Navigator */}
      {showNav && (
        <div
          className="w-55 bg-white border-l border-[#e2e8f0] p-4 overflow-auto shrink-0 animate-[slideInRight_0.2s_ease]"
        >
          <div className="text-xs font-bold text-[#0f172a] mb-3">Navigator</div>
          <div className="grid grid-cols-5 gap-1.5 mb-3.5">
            {questions.map((_, i) => {
              const isAns = answers[i] !== undefined;
              const isCur = i === current;
              const isCorr = isTutorial && isAns && localIsAnswerScored(questions[i], answers[i]);
              const isFlag = flagged[i];
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (mode === "test") {
                      lockTestAnswer(i);
                    } else {
                      setCurrent(i);
                    }
                  }}
                  className="w-full aspect-square rounded-lg cursor-pointer text-[11px] font-bold transition-all relative"
                  style={{
                    border: `2px solid ${
                      isCur
                        ? "#2C5F8D"
                        : isTutorial && isAns
                          ? (isCorr ? "#86efac" : "#fca5a5")
                          : isAns
                            ? "#2C5F8D"
                            : "#e2e8f0"
                    }`,
                    background: isCur
                      ? "#eef4fb"
                      : isTutorial && isAns
                        ? (isCorr ? "#f0fdf4" : "#fff5f5")
                        : isAns
                          ? "#f1f5f9"
                          : "white",
                    color: isCur
                      ? "#2C5F8D"
                      : isTutorial && isAns
                        ? (isCorr ? "#16a34a" : "#dc2626")
                        : isAns
                          ? "#1e293b"
                          : "#94a3b8",
                  }}
                >
                  {i + 1}
                  {isFlag && (
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-amber-500" style={{ transform: "translate(2px,-2px)" }} />
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex flex-col gap-1 mb-3.5">
            {(isTutorial
              ? [
                ["#f0fdf4", "#86efac", "Correct"],
                ["#fff5f5", "#fca5a5", "Incorrect"],
                ["#eef4fb", "#2C5F8D", "Current"],
                ["white", "#e2e8f0", "Unanswered"],
              ]
              : [
                ["#eef4fb", "#2C5F8D", "Current"],
                ["#f1f5f9", "#2C5F8D", "Answered"],
                ["white", "#e2e8f0", "Unanswered"],
              ]
            ).map(([bg, bdr, lbl]) => (
              <div key={lbl} className="flex items-center gap-1.5 text-[11px] text-[#94a3b8]">
                <div
                  className="w-3 h-3 rounded-sm shrink-0"
                  style={{ background: bg, border: `1.5px solid ${bdr}` }}
                />
                {lbl}
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-[#f1f5f9]">
            <div className="text-[10px] text-[#94a3b8] mb-1.5 uppercase tracking-wide">Session Stats</div>
            {(isTutorial
              ? [
                ["Answered", Object.keys(answers).length],
                ["Correct", Object.values(answers).filter((a, i) => localIsAnswerScored(questions[i], a)).length],
                // ["Flagged", Object.values(flagged).filter(Boolean).length],
              ]
              : [
                ["Answered", Object.keys(answers).length],
                ["Remaining", Math.max(0, questions.length - Object.keys(answers).length)],
                // ["Flagged", Object.values(flagged).filter(Boolean).length],
              ]
            ).map(([l, v]) => (
              <div key={l} className="flex justify-between text-xs mb-1">
                <span className="text-[#64748b]">{l}</span>
                <span className="font-bold text-[#0f172a]">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

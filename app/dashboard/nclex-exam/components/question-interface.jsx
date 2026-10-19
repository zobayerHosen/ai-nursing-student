"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useGetUser } from "@/hooks";
import { PARTIAL_CREDIT_TYPES, LETTERS } from "./data";
import { Calculator } from "./sub-components";
import ResultsScreen from "./questions-interface/results-screen";
import BottomNav from "./questions-interface/bottom-nav";
import SplitLayout from "./questions-interface/split-layout";

const NGN_TYPES = new Set(["extended-multi", "matrix", "cloze", "bowtie", "trend", "highlight", "rank"]);

const fmtTime = (s) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n) => n.toString().padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
};

const getCredit = (question, userAns, isQBank, backendFeedback) => {
  if (userAns === undefined || userAns === null) {
    return { percent: 0, points: 0, max: 1, isFullCorrect: false, answered: false };
  }
  if (isQBank) {
    const fb = backendFeedback?.[question.id];
    const isCorr = fb ? !!fb.is_correct : false;
    return { percent: isCorr ? 100 : 0, points: isCorr ? 1 : 0, max: 1, isFullCorrect: isCorr, answered: true };
  }
  const correctAns = question.correct;

  if (question.type === "matrix") {
    const max = correctAns.length;
    const userArr = Array.isArray(userAns) ? userAns : [];
    let points = 0;
    for (let r = 0; r < max; r++) {
      if (userArr[r] === correctAns[r]) points++;
    }
    const percent = Math.round((points / max) * 100);
    return { percent, points, max, isFullCorrect: points === max, answered: true };
  }

  if (question.type === "cloze") {
    const max = correctAns.length;
    const userArr = Array.isArray(userAns) ? userAns : [];
    let points = 0;
    for (let b = 0; b < max; b++) {
      if (userArr[b] === correctAns[b]) points++;
    }
    const percent = Math.round((points / max) * 100);
    return { percent, points, max, isFullCorrect: points === max, answered: true };
  }

  if (question.type === "fill-blank" || question.type === "input") {
    const cfg = question.blankInput || {};
    let ok = false;
    if (cfg.kind === "numeric") {
      const userNum = parseFloat(userAns);
      const correctNum = parseFloat(cfg.correct);
      const tolerance = cfg.tolerance != null ? parseFloat(cfg.tolerance) : 0;
      if (!isNaN(userNum) && !isNaN(correctNum)) {
        ok = Math.abs(userNum - correctNum) <= tolerance;
      }
    } else {
      const acceptable = Array.isArray(cfg.correct) ? cfg.correct : [cfg.correct];
      const norm = (s) => (cfg.caseSensitive ? String(s).trim() : String(s).trim().toLowerCase());
      const u = norm(userAns);
      ok = acceptable.some((a) => norm(a) === u);
    }
    return { percent: ok ? 100 : 0, points: ok ? 1 : 0, max: 1, isFullCorrect: ok, answered: true };
  }

  const usePartial = PARTIAL_CREDIT_TYPES.includes(question.type);

  if (!Array.isArray(correctAns)) {
    const ok = userAns === correctAns;
    return { percent: ok ? 100 : 0, points: ok ? 1 : 0, max: 1, isFullCorrect: ok, answered: true };
  }

  const userArr = Array.isArray(userAns) ? userAns : [userAns];
  const correctSet = new Set(correctAns);
  const userSet = new Set(userArr);

  if (!usePartial) {
    const allRight = correctAns.length === userArr.length && correctAns.every((c) => userSet.has(c));
    return { percent: allRight ? 100 : 0, points: allRight ? 1 : 0, max: 1, isFullCorrect: allRight, answered: true };
  }

  const max = correctAns.length;
  let points = 0;
  userArr.forEach((u) => {
    if (correctSet.has(u)) points += 1;
    else points -= 1;
  });
  points = Math.max(0, points);
  const percent = Math.round((points / max) * 100);
  return { percent, points, max, isFullCorrect: percent === 100, answered: true };
};

const isAnswerScored = (question, userAns, isQBank, backendFeedback) => {
  if (userAns === undefined || userAns === null) return false;
  if (isQBank) {
    return !!backendFeedback?.[question.id]?.is_correct;
  }
  return getCredit(question, userAns, isQBank, backendFeedback).percent >= 80;
};

export default function QuestionInterface({
  questions,
  mode,
  title,
  examMeta,
  onSessionEnd,
  onFinish,
  isQBank,
  onSubmitAnswer,
  onFinishExam,
  initialQuestionIndex = 0,
  initialTimeLeft,
  initialFlagged = {},
  initialAnswers = {},
}) {
  const { user } = useGetUser();
  const sessionId = examMeta?.sessionId;
  const [current, setCurrent] = useState(() => {
    const validIdx = Number(initialQuestionIndex);
    if (!isNaN(validIdx) && validIdx >= 0 && questions?.length > 0) {
      return Math.min(validIdx, questions.length - 1);
    }
    return 0;
  });
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState(initialAnswers || {});
  const [flagged, setFlagged] = useState(initialFlagged || {});
  const [showNav, setShowNav] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    if (initialTimeLeft !== undefined && initialTimeLeft !== null) {
      return initialTimeLeft;
    }
    return mode === "test" ? 9000 : null;
  });
  const [finished, setFinished] = useState(false);
  const [paused, setPaused] = useState(false);
  const [backendFeedback, setBackendFeedback] = useState({});
  const [backendResult, setBackendResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  const q = questions[current];
  const isTutorial = mode === "practice" || mode === "tutorial";

  const localIsAnswerScored = useCallback((question, userAns) => {
    return isAnswerScored(question, userAns, isQBank, backendFeedback);
  }, [isQBank, backendFeedback]);

  const localGetCredit = useCallback((question, userAns) => {
    return getCredit(question, userAns, isQBank, backendFeedback);
  }, [isQBank, backendFeedback]);

  const getQbankCorrectIndices = (question) => {
    const ca = backendFeedback[question.id]?.correct_answer;
    if (!ca) return [];
    const caList = Array.isArray(ca) ? ca : [ca];
    const indices = [];
    const opts = question.originalOptions || question.options || [];
    caList.forEach(item => {
      const targetId = typeof item === "object" && item !== null ? (item.id ?? item.option_id) : item;
      const idx = opts.findIndex(opt => {
        if (typeof opt === "object" && opt !== null) {
          return opt.id === targetId || (item.text && opt.text === item.text);
        }
        return opt === item || opt === item?.text;
      });
      if (idx !== -1 && idx !== undefined) {
        indices.push(idx);
      }
    });
    return indices;
  };





  const submitCurrentAnswer = async (ansVal, currentIndex = current) => {
    if (onSubmitAnswer) {
      setIsSubmitting(true);
      try {
        const curQ = questions[currentIndex] || q;
        if (!curQ) return;
        const feedback = await onSubmitAnswer(curQ.id, ansVal, currentIndex);
        if (feedback) {
          const qId = curQ.id ?? curQ.question_id;
          setBackendFeedback((prev) => ({
            ...prev,
            [curQ.id]: feedback,
            ...(qId && qId !== curQ.id ? { [qId]: feedback } : {}),
            ...(feedback.question_id ? { [feedback.question_id]: feedback } : {}),
          }));
        }
      } catch (err) {
        console.error("Error submitting answer:", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleFinish = useCallback(async () => {
    setIsFinishing(true);
    if (onFinishExam) {
      try {
        const resultSummary = await onFinishExam();
        if (resultSummary) {
          setBackendResult(resultSummary);
          const feedbackMap = {};
          const resultsList = resultSummary.result?.results || resultSummary.results || [];
          resultsList.forEach((res) => {
            feedbackMap[res.question_id] = {
              is_correct: res.is_correct,
              correct_answer: res.correct_answer,
              explanation: res.explanation || null,
              avg_solve_percent: res.avg_solve_percent ?? res.avg_percent ?? null,
            };
          });
          setBackendFeedback((prev) => ({ ...prev, ...feedbackMap }));
        }
      } catch (err) {
        console.error("Error finishing exam:", err);
      } finally {
        setIsFinishing(false);
      }
    } else {
      setIsFinishing(false);
    }
    if (isTutorial) setFinished(true);
    else {
      setRevealed(true);
      setFinished(true);
    }
  }, [onFinishExam, isTutorial]);

  useEffect(() => {
    if (mode === "test" && timeLeft > 0 && !finished && !paused) {
      const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
    if (timeLeft === 0) {
      const t = setTimeout(() => {
        handleFinish();
      }, 0);
      return () => clearTimeout(t);
    }
  }, [timeLeft, finished, paused, handleFinish, mode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (answers[current] !== undefined) {
        setSelected(answers[current]);
        if (isTutorial) setRevealed(true);
      } else {
        const curQ = questions[current];
        if (curQ && curQ.type === "order" && curQ.options) {
          setSelected(Array.from({ length: curQ.options.length }, (_, i) => i));
        } else {
          setSelected(null);
        }
        setRevealed(false);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [current, answers, isTutorial, questions]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const style = document.createElement("style");
      style.textContent = `
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes scaleIn { from { opacity:0; transform:scale(.97) } to { opacity:1; transform:scale(1) } }
        @keyframes slideInRight { from { opacity:0; transform:translateX(8px) } to { opacity:1; transform:translateX(0) } }
      `;
      document.head.appendChild(style);
      return () => document.head.removeChild(style);
    }
  }, []);

  const lockTestAnswer = async (targetIdx) => {
    if (mode === "test" && selected !== null && selected !== undefined) {
      const hasAnswer = Array.isArray(selected)
        ? selected.length > 0
        : typeof selected === "string"
          ? selected.trim().length > 0
          : typeof selected === "number"
            ? true
            : selected !== null && selected !== undefined;

      if (hasAnswer) {
        if (onSubmitAnswer) {
          setIsSubmitting(true);
          try {
            await submitCurrentAnswer(selected, current);
          } finally {
            setIsSubmitting(false);
          }
        }
        setAnswers((a) => ({ ...a, [current]: selected }));
      }
    }
    setCurrent(targetIdx);
  };

  const score = useMemo(() => {
    if (isQBank && backendResult) {
      const r = backendResult.result || {};
      return {
        answered: (r.total_question ?? 0) - (r.total_skipped_answer ?? 0),
        correct: r.total_correct_answer ?? 0,
        total: r.total_question ?? 0,
        pct: r.total_percentage ?? 0
      };
    }
    const answered = Object.keys(answers).length;
    const correct = Object.entries(answers).filter(([idx, ans]) => localIsAnswerScored(questions[+idx], ans)).length;
    return { answered, correct, total: questions.length, pct: answered > 0 ? Math.round((correct / answered) * 100) : 0 };
  }, [answers, questions, isQBank, backendResult, localIsAnswerScored]);

  const isAnswered = answers[current] !== undefined;

  // Results screen
  if (finished) {
    return (
      <ResultsScreen
        score={score}
        title={title}
        questions={questions}
        answers={answers}
        flagged={flagged}
        isQBank={isQBank}
        backendFeedback={backendFeedback}
        examMeta={examMeta}
        localIsAnswerScored={localIsAnswerScored}
        localGetCredit={localGetCredit}
        getQbankCorrectIndices={getQbankCorrectIndices}
        onSessionEnd={onSessionEnd}
        onFinish={onFinish}
        onRetrySession={() => {
          setCurrent(0);
          setSelected(null);
          setRevealed(false);
          setAnswers({});
          setFlagged({});
          setFinished(false);
          setTimeLeft(mode === "test" ? 9000 : null);
        }}
      />
    );
  }

  // Question screen
  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden bg-[#f4f6f9] relative">
      {/* Top status bar */}
      <div className="w-full bg-[#2C5F8D] px-4 h-11.5 flex items-center justify-between shrink-0 z-11 text-white gap-2">
        <div className="w-full flex items-center gap-2.5">
          <div className="w-full flex items-center gap-1.5 ">
            GENCLEX - <p className="text-gray-200 text-[14px]!">{user?.full_name}</p>
          </div>
        </div>

        <div className="w-full flex flex-col items-center leading-tight text-center px-2">
          <div className="text-[11px] font-semibold opacity-95 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            {examMeta && examMeta.isFullExam ? title : mode === "test" ? "Timed Tutorial" : "Tutorial Mode"}
          </div>
          <div className="text-[10px] opacity-65 whitespace-nowrap">
            QID: {String(q?.id || "").replace(/^q/, "") || "—"}
          </div>
        </div>

        <div className="w-full flex flex-col items-end leading-tight flex-[0_1_auto] gap-0.5">
          {mode === "test" && timeLeft !== null && (
            <div
              className="flex items-center gap-1.5 text-[13px] font-semibold whitespace-nowrap"
              style={{ color: timeLeft < 60 ? "#fecaca" : "white" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <span>
                Time Remaining :{" "}
                <span className="font-mono font-bold">{fmtTime(timeLeft)}</span>
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs font-semibold opacity-95 whitespace-nowrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <rect x="4" y="5" width="16" height="16" rx="2" /><path d="M9 5V3h6v2" /><line x1="8" y1="11" x2="16" y2="11" /><line x1="8" y1="15" x2="13" y2="15" />
            </svg>
            <span>
              {current + 1} of {questions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Secondary toolbar */}
      <div className="bg-[#3a7ab2] px-3 h-9.5 flex items-center justify-between shrink-0 z-10 gap-1.5">
        <div></div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowCalc((s) => !s)}
            title="Calculator"
            className="w-7 h-7 border-none rounded-sm cursor-pointer flex items-center justify-center"
            style={{
              background: showCalc ? "rgba(255,255,255,0.22)" : "transparent",
              color: "white",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="12" x2="8" y2="12" /><line x1="12" y1="12" x2="12" y2="12" /><line x1="16" y1="12" x2="16" y2="12" />
            </svg>
          </button>
          <button
            onClick={() => setShowNav((s) => !s)}
            title="Navigator"
            className="w-7 h-7 border-none rounded-sm cursor-pointer flex items-center justify-center"
            style={{
              background: showNav ? "rgba(255,255,255,0.22)" : "transparent",
              color: "white",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Split layout */}
      <SplitLayout
        questions={questions}
        current={current}
        q={q}
        mode={mode}
        isTutorial={isTutorial}
        isQBank={isQBank}
        selected={selected}
        setSelected={setSelected}
        answers={answers}
        setAnswers={setAnswers}
        flagged={flagged}
        revealed={revealed}
        setRevealed={setRevealed}
        showNav={showNav}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        backendFeedback={backendFeedback}
        finished={finished}
        localIsAnswerScored={localIsAnswerScored}
        localGetCredit={localGetCredit}
        getQbankCorrectIndices={getQbankCorrectIndices}
        lockTestAnswer={lockTestAnswer}
        setCurrent={setCurrent}
        submitCurrentAnswer={submitCurrentAnswer}
        onSubmitAnswer={onSubmitAnswer}
      />

      {/* Bottom nav & Pause overlay */}
      <BottomNav
        mode={mode}
        current={current}
        totalQuestions={questions.length}
        q={q}
        selected={selected}
        isAnswered={isAnswered}
        isSubmitting={isSubmitting}
        isFinishing={isFinishing}
        paused={paused}
        setPaused={setPaused}
        sessionId={sessionId}
        isQBank={isQBank}
        setCurrent={setCurrent}
        setAnswers={setAnswers}
        setRevealed={setRevealed}
        lockTestAnswer={lockTestAnswer}
        submitCurrentAnswer={submitCurrentAnswer}
        onSubmitAnswer={onSubmitAnswer}
        handleFinish={handleFinish}
      />

      {/* Calculator */}
      {showCalc && (
        <div className="absolute z-200 top-23" style={{ right: showNav ? 250 : 16, animation: "scaleIn 0.2s ease" }}>
          <div className="relative">
            <button
              onClick={() => setShowCalc(false)}
              className="absolute -top-2 -right-2 w-5.5 h-5.5 rounded-full bg-red-500 border-2 border-white text-white text-[11px] cursor-pointer flex items-center justify-center font-bold z-201 shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
            >
              ✕
            </button>
            <Calculator />
          </div>
        </div>
      )}

      {/* Finishing session overlay loader */}
      {isFinishing && (
        <div className="fixed inset-0 bg-[#0f172a]/70 z-500 flex flex-col items-center justify-center text-white font-sans backdrop-blur-xs animate-[fadeIn_0.2s_ease]">
          <div className="bg-white text-slate-800 rounded-2xl p-7 shadow-2xl flex flex-col items-center max-w-sm w-full text-center border border-slate-100 mx-4">
            <div className="w-11 h-11 border-4 border-[#2C5F8D] border-t-transparent rounded-full animate-spin mb-3.5"></div>
            <h3 className="text-base font-bold text-[#0f172a] mb-1">Finishing Practice Session...</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Generating score report and performance summary. Please wait...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

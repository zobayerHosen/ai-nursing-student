export const formatFileSize = (bytes) => {
  if (!bytes) return "";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

export const programOptions = [
  { label: "LPN/LVN", value: "LPN" },
  { label: "RN", value: "RN" },
];

export const questionFormatOptions = [
  { label: "standard multiple choice (MCQ)", value: "MCQ" },
  { label: "Select all that apply (SATA)", value: "SATA" },
  { label: "Next-Generation (NGN) case studies", value: "NGN" },
  { label: "Fill-in-the-blank", value: "FITB" },
  { label: "Mix and match all types", value: "MIX" },
];

export const difficultyOptions = [
  { label: "All Levels", value: "all" },
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

export const ACCEPTED_FILE_TYPES = ".pdf,.doc,.docx,.ppt,.pptx,image/*";

export const DEFAULT_QUESTION_COUNT = 10;
export const MIN_QUESTION_COUNT = 1;
export const MAX_QUESTION_COUNT = 30;

export const clampQuestionCount = (value) => {
  const num = Number(value);
  if (!value || isNaN(num)) return "";
  return Math.min(Math.max(num, MIN_QUESTION_COUNT), MAX_QUESTION_COUNT);
};

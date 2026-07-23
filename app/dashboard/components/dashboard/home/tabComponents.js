import Flashcards from "./flashcard/TabFlashcards";
import LessonVideos from "./tab-lessons-videos/LessonVideos";
import NgnNclex from "./tab-nclex/TabNgnNclex";
import StudyNotesTab from "./tab-study-notes/TabStudyNotes";
import TabQBank from "./tab-qbank/TabQBank";

export const TABS = [
  "NGN NCLEX",
  "QBank",
  "Flashcards",
  "Study Notes",
  "Lesson Videos"
];

export const TAB_COMPONENTS = {
  "NGN NCLEX": NgnNclex,
  "QBank": TabQBank,
  "Flashcards": Flashcards,
  "Study Notes": StudyNotesTab,
  "Lesson Videos": LessonVideos,
}
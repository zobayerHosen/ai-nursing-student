import Flashcards from "./flashcard/TabFlashcards";
import LessonVideos from "./tab-lessons-videos/LessonVideos";
import NgnNclex from "./tab-nclex/NgnNclex";
import StudyNotesTab from "./tab-study-notes/StudyNotes"

export const TABS = [
  "NGN NCLEX",
  "Flashcards",
  "Study Notes",
  "Lesson Videos"
];

export const TAB_COMPONENTS = {
  "NGN NCLEX": NgnNclex,
  "Flashcards": Flashcards,
  "Study Notes": StudyNotesTab,
  "Lesson Videos": LessonVideos,
}
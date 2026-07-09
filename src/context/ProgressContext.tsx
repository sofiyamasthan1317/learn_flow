import { createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface ProgressContextType {
  completedLessons: string[];
  quizScores: Record<string, number>;
  markLessonComplete: (lessonId: string) => void;
  saveQuizScore: (quizId: string, score: number) => void;
  isLessonComplete: (lessonId: string) => boolean;
  getCourseProgress: (lessonIds: string[]) => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedLessons, setCompletedLessons] = useLocalStorage<string[]>(
    "completedLessons",
    []
  );
  const [quizScores, setQuizScores] = useLocalStorage<Record<string, number>>(
    "quizScores",
    {}
  );

  const markLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId) ? prev : [...prev, lessonId]
    );
  };

  const saveQuizScore = (quizId: string, score: number) => {
    setQuizScores((prev) => ({ ...prev, [quizId]: score }));
  };

  const isLessonComplete = (lessonId: string) =>
    completedLessons.includes(lessonId);

  const getCourseProgress = (lessonIds: string[]) => {
    if (lessonIds.length === 0) return 0;
    const done = lessonIds.filter((id) => completedLessons.includes(id)).length;
    return Math.round((done / lessonIds.length) * 100);
  };

  return (
    <ProgressContext.Provider
      value={{
        completedLessons,
        quizScores,
        markLessonComplete,
        saveQuizScore,
        isLessonComplete,
        getCourseProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used within ProgressProvider");
  return context;
}
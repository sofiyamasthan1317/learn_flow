import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";
import lessonsData from "../data/lessons.json";
import coursesData from "../data/courses.json";
import { useProgress } from "../context/ProgressContext";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import LessonContent from "../components/LessonContent";

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { markLessonComplete, isLessonComplete } = useProgress();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const lesson = lessonsData.find((l) => l.id === id);
  const course = lesson
    ? coursesData.find((c) => c.id === lesson.courseId)
    : null;

  const courseLessons = lesson
    ? lessonsData.filter((l) => l.courseId === lesson.courseId)
    : [];

  if (!lesson || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-5xl">😕</p>
        <p
          className={`text-xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Lesson not found
        </p>
        <Link
          to="/"
          className={`${
            isDark ? "text-indigo-400" : "text-indigo-500"
          } hover:underline`}
        >
          ← Back to courses
        </Link>
      </div>
    );
  }

  const currentIndex = courseLessons.findIndex((l) => l.id === id);
  const prevLesson = courseLessons[currentIndex - 1];
  const nextLesson = courseLessons[currentIndex + 1];
  const isDone = isLessonComplete(lesson.id);

  return (
    <main
      className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Back */}
      <button
        onClick={() => navigate(`/course/${course.id}`)}
        className={`flex items-center gap-2 mb-6 transition-colors text-sm ${
          isDark
            ? "text-gray-400 hover:text-white"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to {course.title}
      </button>

      <div className="flex gap-8">
        {/* Sidebar */}
        <Sidebar lessons={courseLessons} courseId={course.id} />

        {/* Content */}
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex-1 min-w-0"
        >
          {/* Lesson Header */}
          <div
            className={`
              rounded-2xl border p-8 mb-6
              ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }
            `}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p
                  className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
                    isDark ? "text-indigo-400" : "text-indigo-500"
                  }`}
                >
                  {course.title}
                </p>

                <h1
                  className={`text-2xl font-bold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {lesson.title}
                </h1>

                <p
                  className={`text-sm mt-1 ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  ⏱ {lesson.duration}
                </p>
              </div>

              <button
                onClick={() => markLessonComplete(lesson.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all shrink-0
                  ${
                    isDone
                      ? isDark
                        ? "bg-green-900/30 text-green-400"
                        : "bg-green-100 text-green-600"
                      : isDark
                      ? "bg-indigo-900/20 text-indigo-400 hover:bg-indigo-900/30"
                      : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                  }
                `}
              >
                {isDone ? (
                  <>
                    <CheckCircleSolid className="w-4 h-4" />
                    Completed
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-4 h-4" />
                    Mark Complete
                  </>
                )}
              </button>
            </div>

            {/* Content */}
            <LessonContent content={lesson.content} />
          </div>

          {/* Navigation */}
          <div className="flex justify-between gap-4">
            {prevLesson ? (
              <Link
                to={`/lesson/${prevLesson.id}`}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all
                  ${
                    isDark
                      ? "border-gray-700 text-gray-400 hover:border-indigo-500 hover:text-indigo-400"
                      : "border-gray-200 text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
                  }
                `}
              >
                <ArrowLeftIcon className="w-4 h-4" />
                {prevLesson.title}
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                to={`/lesson/${nextLesson.id}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-all text-sm font-medium"
              >
                {nextLesson.title}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to={`/quiz/${course.quizId}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-all text-sm font-medium"
              >
                Take Quiz 🏆
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
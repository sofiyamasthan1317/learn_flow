import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  PlayCircleIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import coursesData from "../data/courses.json";
import lessonsData from "../data/lessons.json";
import { useProgress } from "../context/ProgressContext";
import { useTheme } from "../context/ThemeContext";
import ProgressBar from "../components/ProgressBar";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find((c) => c.id === id);

  const { getCourseProgress, isLessonComplete } = useProgress();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-5xl">😕</p>
        <p
          className={`text-xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Course not found
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

  const lessons = lessonsData.filter((l) =>
    course.lessons.includes(l.id)
  );
  const progress = getCourseProgress(course.lessons);

  return (
    <main
      className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Back */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className={`flex items-center gap-2 mb-6 transition-colors ${
          isDark
            ? "text-gray-400 hover:text-white"
            : "text-gray-500 hover:text-gray-900"
        }`}
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span className="text-sm">Back to courses</span>
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          rounded-2xl border p-8 mb-6
          ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200"
          }
        `}
      >
        <div className="flex items-start gap-4 mb-6">
          <span className="text-5xl">{course.icon}</span>

          <div>
            <h1
              className={`text-3xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {course.title}
            </h1>

            <p
              className={`mt-2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {course.description}
            </p>

            <div className="flex gap-3 mt-3">
              {[
                `⏱ ${course.duration}`,
                `📚 ${course.lessons.length} lessons`,
                `🎯 ${course.level}`,
              ].map((item, i) => (
                <span
                  key={i}
                  className={`
                    text-xs px-2 py-1 rounded-lg
                    ${
                      isDark
                        ? "bg-gray-800 text-gray-400"
                        : "bg-gray-100 text-gray-600"
                    }
                  `}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ProgressBar progress={progress} />
      </motion.div>

      {/* Lessons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`
          rounded-2xl border overflow-hidden mb-6
          ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200"
          }
        `}
      >
        <div
          className={`px-6 py-4 border-b ${
            isDark ? "border-gray-800" : "border-gray-100"
          }`}
        >
          <h2
            className={`font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Lessons
          </h2>
        </div>

        <div
          className={`divide-y ${
            isDark ? "divide-gray-800" : "divide-gray-100"
          }`}
        >
          {lessons.map((lesson, i) => {
            const done = isLessonComplete(lesson.id);

            return (
              <Link
                key={lesson.id}
                to={`/lesson/${lesson.id}`}
                className={`
                  flex items-center gap-4 px-6 py-4 transition-colors group
                  ${
                    isDark
                      ? "hover:bg-gray-800/50"
                      : "hover:bg-gray-50"
                  }
                `}
              >
                <span
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                    ${
                      done
                        ? "bg-green-100 text-green-600"
                        : "bg-indigo-50 text-indigo-600"
                    }
                    ${isDark && done ? "bg-green-900/30" : ""}
                    ${isDark && !done ? "bg-indigo-900/20" : ""}
                  `}
                >
                  {done ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    i + 1
                  )}
                </span>

                <div className="flex-1">
                  <p
                    className={`
                      font-medium transition-colors
                      ${
                        isDark
                          ? "text-white group-hover:text-indigo-400"
                          : "text-gray-900 group-hover:text-indigo-600"
                      }
                    `}
                  >
                    {lesson.title}
                  </p>

                  <p
                    className={`text-xs ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {lesson.duration}
                  </p>
                </div>

                <PlayCircleIcon
                  className={`w-5 h-5 transition-colors ${
                    isDark
                      ? "text-gray-600 group-hover:text-indigo-400"
                      : "text-gray-300 group-hover:text-indigo-500"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Quiz CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          to={`/quiz/${course.quizId}`}
          className="flex items-center justify-between bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-2xl px-8 py-5 transition-all duration-300 shadow-lg"
        >
          <div>
            <p className="font-bold text-lg">Take the Quiz</p>
            <p className="text-indigo-200 text-sm">
              Test your knowledge
            </p>
          </div>

          <TrophyIcon className="w-8 h-8 text-indigo-200" />
        </Link>
      </motion.div>
    </main>
  );
}
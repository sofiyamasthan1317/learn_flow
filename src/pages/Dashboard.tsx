import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrophyIcon,
  BookOpenIcon,
  CheckCircleIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import coursesData from "../data/courses.json";
import { useProgress } from "../context/ProgressContext";
import { useTheme } from "../context/ThemeContext";
import ProgressBar from "../components/ProgressBar";
import FlipCard from "../components/FlipCard";

const flashcards = [
  { front: "What is a closure in JavaScript?", back: "A function that retains access to its outer scope even after the outer function has returned." },
  { front: "What does useState return?", back: "An array with two elements: the current state value and a setter function." },
  { front: "What is the purpose of useEffect?", back: "To run side effects after render." },
  { front: "What is a TypeScript generic?", back: "Reusable, type-safe code for multiple types." },
  { front: "What does Partial<T> do?", back: "Makes all properties optional." },
  { front: "What is CSS box model?", back: "Content + Padding + Border + Margin." },
];

export default function Dashboard() {
  const { getCourseProgress, completedLessons, quizScores } = useProgress();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const totalLessons = coursesData.reduce(
    (acc, c) => acc + c.lessons.length,
    0
  );

  const completedCount = completedLessons.length;
  const quizCount = Object.keys(quizScores).length;

  const avgScore =
    quizCount > 0
      ? Math.round(
          Object.values(quizScores).reduce((a, b) => a + b, 0) / quizCount
        )
      : 0;

  const stats = [
    { label: "Lessons Completed", value: `${completedCount}/${totalLessons}`, icon: BookOpenIcon, color: "text-blue-500" },
    { label: "Quizzes Taken", value: quizCount, icon: TrophyIcon, color: "text-yellow-500" },
    { label: "Avg Quiz Score", value: quizCount > 0 ? `${avgScore}%` : "—", icon: FireIcon, color: "text-orange-500" },
    { label: "Courses Started", value: coursesData.filter(c => getCourseProgress(c.lessons) > 0).length, icon: CheckCircleIcon, color: "text-green-500" },
  ];

  return (
    <main
      className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1
          className={`text-4xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Your Dashboard 📊
        </h1>

        <p
          className={`mt-2 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Track your learning progress across all courses.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className={`
              rounded-2xl border p-5
              ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }
            `}
          >
            <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />

            <p
              className={`text-2xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {stat.value}
            </p>

            <p
              className={`text-xs mt-0.5 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Course Progress */}
      <motion.div
        className={`
          rounded-2xl border p-6 mb-10
          ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200"
          }
        `}
      >
        <h2
          className={`font-bold text-xl mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Course Progress
        </h2>

        <div className="space-y-6">
          {coursesData.map((course) => {
            const progress = getCourseProgress(course.lessons);
            const quizScore = quizScores[course.quizId];

            return (
              <div key={course.id}>
                <div className="flex justify-between mb-2">
                  <Link
                    to={`/course/${course.id}`}
                    className={`font-medium ${
                      isDark
                        ? "text-white hover:text-indigo-400"
                        : "text-gray-900 hover:text-indigo-600"
                    }`}
                  >
                    {course.title}
                  </Link>

                  <span
                    className={`text-sm font-semibold ${
                      isDark ? "text-indigo-400" : "text-indigo-600"
                    }`}
                  >
                    {progress}%
                  </span>
                </div>

                <ProgressBar progress={progress} showLabel={false} size="sm" />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Flip Cards */}
      <motion.div>
        <h2
          className={`font-bold text-xl mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Quick Revision 🃏
        </h2>

        <p
          className={`text-sm mb-4 ${
            isDark ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Click any card to reveal the answer
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcards.map((card, i) => (
            <FlipCard key={i} front={card.front} back={card.back} />
          ))}
        </div>
      </motion.div>
    </main>
  );
}
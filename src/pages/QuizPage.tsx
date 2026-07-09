import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TrophyIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import quizzesData from "../data/quizzes.json";
import coursesData from "../data/courses.json";
import { useProgress } from "../context/ProgressContext";
import { useTheme } from "../context/ThemeContext";
import QuizCard from "../components/QuizCard";

export default function QuizPage() {
  const { id } = useParams();
  const { saveQuizScore } = useProgress();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const quiz = quizzesData.find((q) => q.id === id);
  const course = quiz ? coursesData.find((c) => c.quizId === id) : null;

  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-5xl">😕</p>
        <p
          className={`text-xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Quiz not found
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

  const handleAnswer = (isCorrect: boolean) => {
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    if (currentQ + 1 >= quiz.questions.length) {
      const pct = Math.round((newScore / quiz.questions.length) * 100);
      saveQuizScore(quiz.id, pct);
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setFinished(false);
  };

  const percentage = Math.round((score / quiz.questions.length) * 100);

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreEmoji = () => {
    if (percentage === 100) return "🏆";
    if (percentage >= 80) return "🎉";
    if (percentage >= 60) return "👍";
    return "💪";
  };

  return (
    <main
      className={`max-w-2xl mx-auto px-4 sm:px-6 py-10 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1
          className={`text-3xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {quiz.title}
        </h1>

        {course && (
          <p
            className={`mt-1 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {course.title}
          </p>
        )}
      </motion.div>

      {/* Quiz or Result */}
      <AnimatePresence mode="wait">
        {!finished ? (
          <QuizCard
            key={currentQ}
            question={quiz.questions[currentQ]}
            questionNumber={currentQ + 1}
            total={quiz.questions.length}
            onAnswer={handleAnswer}
          />
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`
              rounded-2xl border p-10 text-center
              ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }
            `}
          >
            <div className="text-6xl mb-4">{getScoreEmoji()}</div>

            <h2
              className={`text-2xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Quiz Complete!
            </h2>

            <p
              className={`mb-6 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              You scored {score} out of {quiz.questions.length} questions correctly.
            </p>

            {/* Score */}
            <div className={`text-6xl font-bold mb-2 ${getScoreColor()}`}>
              {percentage}%
            </div>

            <p
              className={`text-sm mb-8 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {percentage >= 80
                ? "Excellent work! You've mastered this topic."
                : percentage >= 60
                ? "Good job! Review the lessons to improve."
                : "Keep practicing! Try reading the lessons again."}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={restart}
                className={`
                  flex items-center justify-center gap-2 px-6 py-3 rounded-xl border font-medium transition-all
                  ${
                    isDark
                      ? "border-gray-700 text-gray-400 hover:border-indigo-500 hover:text-indigo-400"
                      : "border-gray-200 text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
                  }
                `}
              >
                <ArrowPathIcon className="w-4 h-4" />
                Retry Quiz
              </button>

              {course && (
                <Link
                  to={`/course/${course.id}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-all font-medium"
                >
                  Back to Course
                </Link>
              )}

              <Link
                to="/dashboard"
                className={`
                  flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                  ${
                    isDark
                      ? "bg-white text-gray-900 hover:opacity-90"
                      : "bg-gray-900 text-white hover:opacity-90"
                  }
                `}
              >
                <TrophyIcon className="w-4 h-4" />
                View Progress
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
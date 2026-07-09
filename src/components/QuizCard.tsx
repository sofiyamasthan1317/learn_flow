import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useTheme } from "../context/ThemeContext";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizCardProps {
  question: Question;
  questionNumber: number;
  total: number;
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuizCard({
  question,
  questionNumber,
  total,
  onAnswer,
}: QuizCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (option: string) => {
    if (answered) return;

    setSelected(option);
    setAnswered(true);

    const isCorrect = option === question.answer;
    setTimeout(() => onAnswer(isCorrect), 1000);
  };

  const getOptionStyle = (option: string) => {
    if (!answered) {
      return isDark
        ? "border-gray-700 hover:border-indigo-400 hover:bg-indigo-900/20 cursor-pointer"
        : "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer";
    }

    if (option === question.answer) {
      return isDark
        ? "border-green-400 bg-green-900/20 text-green-300"
        : "border-green-400 bg-green-50 text-green-700";
    }

    if (option === selected && option !== question.answer) {
      return isDark
        ? "border-red-400 bg-red-900/20 text-red-300"
        : "border-red-400 bg-red-50 text-red-700";
    }

    return isDark
      ? "border-gray-700 opacity-50"
      : "border-gray-200 opacity-50";
  };

  return (
    <motion.div
      key={questionNumber}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className={`
        rounded-2xl border p-8
        ${
          isDark
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-6">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
              i < questionNumber
                ? "bg-indigo-500"
                : i === questionNumber - 1
                ? "bg-indigo-300"
                : isDark
                ? "bg-gray-700"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <p
        className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
          isDark ? "text-indigo-400" : "text-indigo-500"
        }`}
      >
        Question {questionNumber} of {total}
      </p>

      <h2
        className={`text-xl font-bold mb-6 leading-relaxed ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {question.question}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option) => (
          <motion.button
            key={option}
            whileTap={!answered ? { scale: 0.98 } : {}}
            onClick={() => handleSelect(option)}
            className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium flex items-center justify-between gap-3 ${getOptionStyle(
              option
            )}`}
          >
            <span>{option}</span>

            {answered && option === question.answer && (
              <CheckCircleIcon className="w-5 h-5 text-green-500 shrink-0" />
            )}

            {answered &&
              option === selected &&
              option !== question.answer && (
                <XCircleIcon className="w-5 h-5 text-red-500 shrink-0" />
              )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
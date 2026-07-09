import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ClockIcon,
  SignalIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { useProgress } from "../context/ProgressContext";
import { useTheme } from "../context/ThemeContext";
import ProgressBar from "./ProgressBar";

interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: string[];
  quizId: string;
  duration: string;
  level: string;
}

export default function CourseCard({ course }: { course: Course }) {
  const { getCourseProgress } = useProgress();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const progress = getCourseProgress(course.lessons);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link to={`/course/${course.id}`} className="block">
        <div
          className={`
            rounded-2xl border overflow-hidden transition-all duration-300
            ${
              isDark
                ? "bg-gray-900 border-gray-800 hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-900/20"
                : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
            }
          `}
        >
          {/* Card Header */}
          <div className={`h-2 bg-gradient-to-r ${course.color}`} />

          <div className="p-6">
            {/* Icon + Title */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className={`
                  text-4xl p-2 rounded-xl bg-gradient-to-br ${course.color}
                  ${isDark ? "bg-opacity-20" : "bg-opacity-10"}
                `}
              >
                {course.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h3
                  className={`font-bold text-lg truncate ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {course.title}
                </h3>

                <p
                  className={`text-sm mt-1 line-clamp-2 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {course.description}
                </p>
              </div>
            </div>

            {/* Meta */}
            <div
              className={`flex items-center gap-4 text-xs mb-4 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <span className="flex items-center gap-1">
                <ClockIcon className="w-3.5 h-3.5" />
                {course.duration}
              </span>

              <span className="flex items-center gap-1">
                <BookOpenIcon className="w-3.5 h-3.5" />
                {course.lessons.length} lessons
              </span>

              <span className="flex items-center gap-1">
                <SignalIcon className="w-3.5 h-3.5" />
                {course.level}
              </span>
            </div>

            {/* Progress */}
            <ProgressBar progress={progress} size="sm" showLabel={false} />

            <p
              className={`text-xs mt-1.5 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {progress === 0
                ? "Not started"
                : progress === 100
                ? "Completed"
                : `${progress}% complete`}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
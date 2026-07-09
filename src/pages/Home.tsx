import { useState } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import CourseCard from "../components/CourseCard";
import coursesData from "../data/courses.json";
import { useTheme } from "../context/ThemeContext";

const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");

  const filtered = coursesData.filter((course) => {
    const matchSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());

    const matchLevel = level === "All" || course.level === level;

    return matchSearch && matchLevel;
  });

  return (
    <main
      className={`min-h-screen max-w-full mx-auto px-6 lg:px-10 py-10 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 px-5 space-x-5"
      >
        <h1
          className={`text-xl md:text-4xl font-bold mb-5 tracking-tight ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Learn by doing
        </h1>

        <p
          className={`text-xl max-w-2xl leading-relaxed ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Pick a course, read lessons, take quizzes, and track your progress.
        </p>
      </motion.div>

      {/* Search + Filter */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="space-y-5 mb-14"
      >
        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          />

          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`
              w-full h-14 pl-12 pr-5 rounded-2xl border shadow-sm transition
              ${
                isDark
                  ? "bg-gray-900 text-white border-gray-700 placeholder-gray-500"
                  : "bg-white text-gray-900 border-gray-200 placeholder-gray-400"
              }
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            `}
          />
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap gap-3">
          {levels.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`
                px-5 py-2.5 rounded-2xl text-sm font-medium border transition-all
                ${
                  level === l
                    ? "bg-indigo-500 border-indigo-500 text-white shadow-sm"
                    : isDark
                    ? "border-gray-700 text-gray-300 hover:border-indigo-400 hover:text-indigo-400"
                    : "border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-500"
                }
              `}
            >
              {l}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Course Grid */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center py-24 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <p className="text-6xl mb-5">🔍</p>
          <p className="text-xl font-semibold mb-2">No courses found</p>
          <p>Try a different search or filter</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  );
}
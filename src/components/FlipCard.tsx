import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

interface FlipCardProps {
  front: string;
  back: string;
}

export default function FlipCard({ front, back }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="relative h-48 cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        {/* Front */}
        <div
          className={`
            absolute inset-0 border-2 rounded-2xl flex flex-col items-center justify-center p-6
            ${
              isDark
                ? "bg-gray-900 border-indigo-800"
                : "bg-white border-indigo-200"
            }
          `}
          style={{ backfaceVisibility: "hidden" }}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
              isDark ? "text-indigo-300" : "text-indigo-400"
            }`}
          >
            Question
          </p>

          <p
            className={`text-center font-semibold text-lg leading-snug ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {front}
          </p>

          <p
            className={`text-xs mt-4 ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Click to reveal answer
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex flex-col items-center justify-center p-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="text-xs font-semibold text-indigo-200 uppercase tracking-widest mb-3">
            Answer
          </p>

          <p className="text-center font-semibold text-white text-lg leading-snug">
            {back}
          </p>

          <p className="text-xs text-indigo-200 mt-4">
            Click to flip back
          </p>
        </div>
      </motion.div>
    </div>
  );
}
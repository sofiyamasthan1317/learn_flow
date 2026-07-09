import { Link, useParams } from "react-router-dom";
import { CheckCircleIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";
import { useProgress } from "../context/ProgressContext";

interface Lesson {
  id: string;
  title: string;
  duration: string;
}

interface SidebarProps {
  lessons: Lesson[];
  courseId: string;
}

export default function Sidebar({ lessons, courseId }: SidebarProps) {
  const { id: currentLessonId } = useParams();
  const { isLessonComplete } = useProgress();

  return (
    <aside className="w-72 shrink-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 h-fit sticky top-24">
      <h3 className="font-bold text-gray-900 dark:text-white mb-3 px-2">
        Course Lessons
      </h3>
      <nav className="space-y-1">
        {lessons.map((lesson, index) => {
          const isActive = lesson.id === currentLessonId;
          const isDone = isLessonComplete(lesson.id);

          return (
            <Link
              key={lesson.id}
              to={`/lesson/${lesson.id}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                isActive
                  ? "bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {/* Status icon */}
              <span className="shrink-0">
                {isDone ? (
                  <CheckCircleSolid className="w-5 h-5 text-green-500" />
                ) : (
                  <span className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold border-2 ${
                    isActive
                      ? "border-brand-500 text-brand-500"
                      : "border-gray-300 dark:border-gray-600 text-gray-400"
                  }`}>
                    {index + 1}
                  </span>
                )}
              </span>

              {/* Lesson info */}
              <div className="flex-1 min-w-0">
                <p className="truncate">{lesson.title}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {lesson.duration}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  SunIcon,
  MoonIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Courses" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  console.log(theme, "theme");

  return (
    <nav
      className={`sticky top-0 z-50 border-b shadow-sm ${
        theme === "light"
          ? "bg-white border-gray-200"
          : "bg-gray-950 border-gray-800"
      }`}
    >
      <div className="max-w-full mx-auto px-6 lg:px-10">
        <div className="h-20 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-bold text-indigo-500"
          >
            <AcademicCapIcon className="w-8 h-8" />
            <span>LearnFlow</span>
          </Link>

          <div className="flex items-center gap-3">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                px-5 py-2.5 rounded-2xl text-sm font-medium transition
                ${
                  active
                    ? theme === "light"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-indigo-500/15 text-indigo-400"
                    : theme === "light"
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-gray-300 hover:bg-gray-800"
                }
              `}
                >
                  {link.label}
                </Link>
              );
            })}

            <button
              onClick={toggleTheme}
              className={`
            p-3 rounded-2xl transition
            ${
              theme === "light"
                ? "text-gray-700 hover:bg-gray-100"
                : "text-gray-300 hover:bg-gray-800"
            }
          `}
            >
              {theme === "light" ? (
                <MoonIcon className="w-5 h-5" />
              ) : (
                <SunIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

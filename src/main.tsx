import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ProgressProvider } from "./context/ProgressContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CourseDetails from "./pages/CourseDetails";
import LessonPage from "./pages/LessonPage";
import QuizPage from "./pages/QuizPage";
import Dashboard from "./pages/Dashboard";
import "./style.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ProgressProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/lesson/:id" element={<LessonPage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </ThemeProvider>
  </StrictMode>
);
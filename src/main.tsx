import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import ColorQuiz from "./Colors/index.tsx";
import { Expr01 } from "./Expr01/index.tsx";
import { Expr02 } from "./Expr02/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/color-quiz" element={<ColorQuiz />} />
        <Route path="/expr-01" element={<Expr01 />} />
        <Route path="/expr-02" element={<Expr02 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

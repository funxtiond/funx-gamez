import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import ColorQuiz from "./Colors/index.tsx";
import { Expr01 } from "./Expr01/index.tsx";
import { Expr02 } from "./Expr02/index.tsx";
import Expr03 from "./Expr03/index.tsx";
import Expr04 from "./Expr04/index.tsx";
import Expr05 from "./Expr05/index.tsx";
import Expr06 from "./Expr06/index.tsx";
import ExprRhfWithTest from "./ExprRhfWithTest/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/color-quiz" element={<ColorQuiz />} />
        <Route path="/expr-01" element={<Expr01 />} />
        <Route path="/expr-02" element={<Expr02 />} />
        <Route path="/expr-03" element={<Expr03 />} />
        <Route path="/expr-03" element={<Expr03 />} />
        <Route path="/expr-04" element={<Expr04 />} />
        <Route path="/expr-05" element={<Expr05 />} />
        <Route path="/expr-06" element={<Expr06 />} />
        <Route path="/rhf-with-test" element={<ExprRhfWithTest />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

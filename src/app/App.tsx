import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MotionProvider } from "@app/providers/MotionProvider";
import { HomePage } from "@presentation/pages/HomePage";

// Páginas secundarias en chunks propios: la home carga menos JS.
const QuotePage = lazy(() =>
  import("@presentation/pages/QuotePage").then((m) => ({ default: m.QuotePage }))
);
const NotFoundPage = lazy(() =>
  import("@presentation/pages/NotFoundPage").then((m) => ({
    default: m.NotFoundPage,
  }))
);

export function App() {
  return (
    <MotionProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cotizacion" element={<QuotePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionProvider>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MotionProvider } from "@app/providers/MotionProvider";
import { HomePage } from "@presentation/pages/HomePage";
import { QuotePage } from "@presentation/pages/QuotePage";
import { NotFoundPage } from "@presentation/pages/NotFoundPage";

export function App() {
  return (
    <MotionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cotizacionn" element={<QuotePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </MotionProvider>
  );
}

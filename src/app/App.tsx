import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MotionProvider } from "@app/providers/MotionProvider";
import { HomePage } from "@presentation/pages/HomePage";
import { QuotePage } from "@presentation/pages/QuotePage";

export function App() {
  return (
    <MotionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cotizacion" element={<QuotePage />} />
        </Routes>
      </BrowserRouter>
    </MotionProvider>
  );
}

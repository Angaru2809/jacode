import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@app/App";
import "@app/styles/tokens.css";
import "@app/styles/global.css";
import "@app/styles/situations-section.css";
import "@app/styles/stack-section.css";
import "@app/styles/sections-enfoque-contacto.css";
import "@app/styles/process-experience.css";
import "@app/styles/deliverables-vault.css";
import "@app/styles/problems-section.css";
import "@app/styles/why-blades.css";
import "@app/styles/modes-folders.css";
import "@app/styles/faq-section.css";
import "@app/styles/not-found.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element #root not found");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);

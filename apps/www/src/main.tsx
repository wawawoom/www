import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@wawawoom/wui-css";

import "./i18n";
import App from "./components/App/App.tsx";
import { ThemeProvider } from "./context/ThemeProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

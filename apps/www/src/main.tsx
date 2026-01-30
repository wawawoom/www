import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@wawawoom/wui-css";

import App from "./components/App/App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

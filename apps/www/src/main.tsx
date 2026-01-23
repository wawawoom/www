import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import WUI CSS bundle - includes tokens and all component styles
import "@wawawoom/wui-css";

// Import app styles
import "./index.css";

// Import WUI - this imports the JavaScript components
import "@wawawoom/wui";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

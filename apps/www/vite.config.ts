import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // En développement, utiliser les sources directement
  // En production, utiliser le build de la bibliothèque
  const wuiPath =
    mode === "development"
      ? path.resolve(__dirname, "../../libs/wui/src/index.ts")
      : path.resolve(__dirname, "../../libs/wui/dist/index.js");

  // CSS: always use sources so Vite can process @import rules
  const wuiCssPath = path.resolve(
    __dirname,
    "../../libs/wui/src/styles/wui.css"
  );

  const designTokenEnumPath = path.resolve(
    __dirname,
    "../../libs/design-token/src/enum/index.ts"
  );

  return {
    plugins: [react()],
    server: {
      port: 5173,
    },
    resolve: {
      alias: [
        {
          find: "@wawawoom/wui",
          replacement: wuiPath,
        },
        {
          find: "@wawawoom/wui-css",
          replacement: wuiCssPath,
        },
        {
          find: "@wawawoom/design-token/enum",
          replacement: designTokenEnumPath,
        },
      ],
    },
    build: {
      cssCodeSplit: false,
    },
  };
});

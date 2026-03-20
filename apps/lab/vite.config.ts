import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const wuiPath =
    mode === "development"
      ? path.resolve(__dirname, "../../libs/wui/src/index.ts")
      : path.resolve(__dirname, "../../libs/wui/dist/index.js");

  const wuiCssPath = path.resolve(
    __dirname,
    "../../libs/wui/src/styles/wui.css"
  );

  return {
    base: mode === "production" ? "/projects/lab/" : "/",
    plugins: [react()],
    server: {
      port: 5175,
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
      ],
    },
    build: {
      cssCodeSplit: false,
    },
  };
});

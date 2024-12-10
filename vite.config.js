import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Inspect from "vite-plugin-inspect";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    Inspect(),
    visualizer({
      open: true,
      filename: "dist/stats.html",
    }),
  ],
  resolve: {
    alias: {
      "@": "/src", // this tells Vite to map @ to the src folder
      "~": "/",
    },
  },
});

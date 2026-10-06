import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

const alias = (dir: string) =>
  fileURLToPath(new URL(`./src/${dir}`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": alias("app"),
      "@domain": alias("domain"),
      "@application": alias("application"),
      "@presentation": alias("presentation"),
      "@infrastructure": alias("infrastructure"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});

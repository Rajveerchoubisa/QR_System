import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    "/": "http//:localhost:5173"},
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@chakra-ui/react": "@chakra-ui/react",
    },
  },
});



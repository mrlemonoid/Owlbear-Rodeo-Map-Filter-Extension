import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "src/index.html"
    }
  },
  optimizeDeps: {
    include: ["@owlbear-rodeo/sdk"]
  }
});

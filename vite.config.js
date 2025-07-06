import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/bam-task/",

  root: ".",
  publicDir: "public",

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
      output: {
        entryFileNames: "bundle.js",
        assetFileNames: ({ name }) => {
          if (name && name.endsWith(".css")) return "style.css";
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});

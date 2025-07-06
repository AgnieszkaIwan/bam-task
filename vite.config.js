import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/bam-task/", // ważne! dopasuj do nazwy repozytorium na GitHub Pages
  root: ".", // katalog główny projektu
  publicDir: "public", // folder na statyczne pliki (obrazy, video itd.)

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // alias do folderu src
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
      output: {
        // Wszystkie pliki JS i CSS w folderze assets z hashami dla cache bustingu
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});

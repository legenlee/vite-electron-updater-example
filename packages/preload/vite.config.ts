import { builtinModules } from "module";
import { defineConfig } from "vite";
import { join } from "path";
import pkg from "../../package.json";

export default defineConfig({
  root: __dirname,
  build: {
    outDir: "../../dist/preload",
    emptyOutDir: true,
    minify: process.env.NODE_ENV === "production",
    sourcemap: "inline",
    rollupOptions: {
      input: {
        index: join(__dirname, "index.ts"),
      },
      output: {
        format: "cjs",
        entryFileNames: "[name].cjs",
        manualChunks: {},
      },
      external: [
        "electron",
        ...builtinModules,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (pkg as Record<string, any>).dependencies || {},
      ],
    },
  },
});

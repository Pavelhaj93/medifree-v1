import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname) },
  },
  // Next uses the automatic JSX runtime; tsconfig's "preserve" would make tests use React.createElement.
  esbuild: { jsx: "automatic" },
  test: {
    include: ["app/**/*.test.ts"],
    environment: "node",
  },
});

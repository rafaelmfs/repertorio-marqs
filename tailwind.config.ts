import type { Config } from "tailwindcss";

const config: Config = {
  // Safari 10 (iPad 4) does not support :is(), which Tailwind emits for
  // the legacy "class" mode. Use an explicit descendant selector instead.
  darkMode: ["variant", ".dark &"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--background)",
        ink: "var(--foreground)",
        surface: "var(--surface)",
      },
    },
  },
  plugins: [],
};

export default config;

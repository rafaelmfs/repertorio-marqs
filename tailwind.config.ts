import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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

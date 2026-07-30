import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        honey: "#E3B341",
        "honey-deep": "#C9962E",
        "honey-light": "#F2D98A",
        cream: "#F5EFE2",
        bark: "#221B16",
        "bark-soft": "#342922",
        sage: "#6B8E23",
        bg: "#FFFDF8",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

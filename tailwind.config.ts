import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-hanken-grotesk)", "Arial", "Helvetica", "sans-serif"],
        heading: ["var(--font-instrument-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;

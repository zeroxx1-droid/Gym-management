import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lime: {
          DEFAULT: "#CCFF00",
          400: "#D4FF1A",
          500: "#CCFF00",
          600: "#A6D400",
          glow: "rgba(204, 255, 0, 0.35)",
        },
        dark: {
          950: "#070709",
          900: "#0d0e12",
          850: "#12141a",
          800: "#181a22",
          700: "#222533",
          600: "#2f3346",
        },
      },
      boxShadow: {
        "neon": "0 0 20px rgba(204, 255, 0, 0.25)",
        "neon-lg": "0 0 35px rgba(204, 255, 0, 0.4)",
        "card": "0 8px 30px rgba(0, 0, 0, 0.6)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan-line": "scanLine 2s linear infinite",
      },
      keyframes: {
        scanLine: {
          "0%": { transform: "translateY(0%)" },
          "50%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";
import { tailwindTokens } from "./tailwind.token.ts";

const { boxShadow, ...colors } = tailwindTokens;



const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1680px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1680px", // Your custom max-width
      },
    },
    extend: {
        colors,
        boxShadow,
        fontFamily: {
          vazirmatn: ["var(--font-vazirmatn)", "sans-serif"],
          sans: ["var(--font-vazirmatn)", "system-ui", "sans-serif"],
        },
        borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;

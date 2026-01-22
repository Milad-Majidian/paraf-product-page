import { negative } from "zod";

export const tailwindTokens = {
  primary: "var(--color-primary)",

  text: {
    primary: "var(--color-text-primary)",
    secondary: "var(--color-text-secondary)",
    tertiary: "var(--color-text-tertiary)"
  },

  bg: {
    body: "var(--color-bg-body)",
    surface: "var(--color-bg-surface)",
    login: "var(--color-bg-login)"
  },

  border: {
    primary: "var(--color-border-primary)",
    secondary: "var(--color-border-secondary)",
  },

  separator: "var(--color-separator)",

  success: "var(--color-success)",
  negative: "var(--color-negative)",
  error: "var(--color-error)",
  accentPurple: "var(--color-accent)",
  primaryBlue: "var(--color-blue)",

  boxShadow: {
    card: "var(--shadow-card)",
  },
};


  
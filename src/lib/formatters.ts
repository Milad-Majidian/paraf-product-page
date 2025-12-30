/**
 * Format a number as Persian/Farsi locale
 */
export function formatPersianNumber(value: number): string {
  try {
    return new Intl.NumberFormat("fa-IR").format(value);
  } catch {
    return String(value);
  }
}

/**
 * Format Toman currency with Persian numerals
 */
export function formatToman(priceToman: number): string {
  return formatPersianNumber(priceToman);
}

/**
 * Format large numbers with K/M suffixes (e.g., 1.2M)
 */
export function formatCompactNumber(value: number): string {
  try {
    return new Intl.NumberFormat("fa-IR", {
      notation: "compact",
      compactDisplay: "short",
    }).format(value);
  } catch {
    return String(value);
  }
}

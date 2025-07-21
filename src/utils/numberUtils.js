/**
 * Format a number with thousands separators (commas)
 * @param {number|string} number - The number to format
 * @param {string} locale - The locale to use for formatting (default: 'id-ID' for Indonesian)
 * @returns {string} Formatted number with thousands separators
 */
export const formatNumber = (number, locale = "id-ID") => {
  // Handle null, undefined, or empty values
  if (number === null || number === undefined || number === "") {
    return "0";
  }

  // Convert to number if it's a string
  const numValue = typeof number === "string" ? parseFloat(number) : number;

  // Check if it's a valid number
  if (isNaN(numValue)) {
    return "0";
  }

  // Format the number with thousands separators
  return numValue.toLocaleString(locale);
};

/**
 * Format a number with thousands separators using comma (US style)
 * @param {number|string} number - The number to format
 * @returns {string} Formatted number with comma separators (e.g., 1,234,567)
 */
export const formatNumberWithComma = (number) => {
  return formatNumber(number, "en-US");
};

/**
 * Format a number with thousands separators using dot (Indonesian style)
 * @param {number|string} number - The number to format
 * @returns {string} Formatted number with dot separators (e.g., 1.234.567)
 */
export const formatNumberWithDot = (number) => {
  return formatNumber(number, "id-ID");
};

/**
 * Format currency in Indonesian Rupiah
 * @param {number|string} number - The number to format
 * @param {boolean} showSymbol - Whether to show the currency symbol (default: true)
 * @returns {string} Formatted currency (e.g., Rp 1.234.567 or 1.234.567)
 */
export const formatCurrency = (number, showSymbol = true) => {
  // Handle null, undefined, or empty values
  if (number === null || number === undefined || number === "") {
    return showSymbol ? "Rp 0" : "0";
  }

  // Convert to number if it's a string
  const numValue = typeof number === "string" ? parseFloat(number) : number;

  // Check if it's a valid number
  if (isNaN(numValue)) {
    return showSymbol ? "Rp 0" : "0";
  }

  // Format the number
  const formatted = numValue.toLocaleString("id-ID");

  return showSymbol ? `Rp ${formatted}` : formatted;
};

/**
 * Parse a formatted number string back to a number
 * @param {string} formattedNumber - The formatted number string
 * @returns {number} The parsed number
 */
export const parseFormattedNumber = (formattedNumber) => {
  if (!formattedNumber || typeof formattedNumber !== "string") {
    return 0;
  }

  // Remove currency symbol, spaces, and common separators
  const cleanedNumber = formattedNumber
    .replace(/Rp\s?/g, "") // Remove Rp symbol
    .replace(/\./g, "") // Remove dots (Indonesian thousands separator)
    .replace(/,/g, "") // Remove commas (US thousands separator)
    .trim();

  const parsed = parseFloat(cleanedNumber);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Format date to Indonesian format (DD/MM/YYYY)
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return "-";

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "-";

    return dateObj.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch (error) {
    return "-";
  }
};

/**
 * Format date and time to Indonesian format (DD/MM/YYYY HH:mm)
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date) => {
  if (!date) return "-";

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "-";

    return dateObj.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return "-";
  }
};

// Number formatting utilities

export const formatNumber = (number) => {
  if (number === null || number === undefined || isNaN(number)) {
    return "0";
  }
  return new Intl.NumberFormat("id-ID").format(number);
};

export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "Rp 0";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const parseNumber = (numberString) => {
  if (!numberString) return 0;

  // Remove all non-digit characters except decimal point
  const cleanString = numberString.toString().replace(/[^\d.,]/g, "");

  // Handle Indonesian number format (comma as thousand separator, dot as decimal)
  const normalizedString = cleanString.replace(/\./g, "").replace(",", ".");

  return parseFloat(normalizedString) || 0;
};

export const formatPercentage = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) {
    return "0%";
  }
  return `${Number(value).toFixed(decimals)}%`;
};

export function formatCurrencyUSD(value: number | null | undefined): string {
  const amount = value ?? 0;
  // Formats the number with commas but no symbol or currency code
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

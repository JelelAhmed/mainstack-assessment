export function formatCurrencyUSD(value: number | null | undefined): string {
  const amount = value ?? 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);
}

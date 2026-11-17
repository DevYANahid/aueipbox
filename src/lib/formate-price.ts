
export function formatAED(price: number) {
  const formatted = new Intl.NumberFormat("ar", {
    numberingSystem: "arab",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return `${formatted} د.إ`;
}

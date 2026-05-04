export const toNumber = (input: string) => {
  return parseFloat(input.replaceAll(/\s+/g, "").replace(",", "."));
};

export const formatNumber = (input: number, decimals = 2) => {
  return input.toLocaleString("fi", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  });
};

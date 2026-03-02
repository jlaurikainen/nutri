export const toNumber = (input: string) => {
  return parseFloat(input.replace(",", "."));
};

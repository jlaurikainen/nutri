export const toFormObject = (template: Record<string, string | number>) => {
  return Object.fromEntries(
    Object.entries(template).map(([k, v]) => [k, v.toString()]),
  );
};

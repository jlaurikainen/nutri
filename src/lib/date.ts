export const addDays = (date: Date, amount: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + amount);
  return newDate;
};

export const endOfDay = (date = new Date()) => {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};

export const startOfDay = (date = new Date()) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export const difference = (start: Date, end: Date) => {
  return millisecondsToDays(end.getTime() - start.getTime());
};

export const millisecondsToDays = (input: number) => {
  return Math.round(input / 1000 / 60 / 60 / 24);
};

export const toTimezoneAwareISOString = (date: Date) => {
  return date
    .toLocaleString("fi", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split(".")
    .reverse()
    .join(".")
    .replaceAll(".", "-");
};

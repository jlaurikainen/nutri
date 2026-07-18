import type { Meal } from "../queries/meals";

export const reduceToDailyMacros = (data: Array<Meal>) => {
  return data.reduce(
    (a, c) => {
      a.calories += c.calories;
      a.carbs += c.carbs;
      a.fat += c.fat;
      a.fiber += c.fiber;
      a.protein += c.protein;
      a.sugar += c.sugar;

      return a;
    },
    { calories: 0, carbs: 0, fat: 0, fiber: 0, protein: 0, sugar: 0 },
  );
};

export const calculateMacroRatiosByCalories = (
  macros: ReturnType<typeof reduceToDailyMacros>,
) => {
  const totalMacroAmount =
    macros.carbs + macros.fat * 2.25 + macros.protein || 1;

  return {
    carbs: macros.carbs / totalMacroAmount,
    fat: (macros.fat * 2.25) / totalMacroAmount,
    protein: macros.protein / totalMacroAmount,
  };
};

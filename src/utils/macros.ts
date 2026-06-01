import type z from "zod";
import type { mealSchema } from "../queries/meals";

export const reduceToDailyMacros = (
  data: Array<z.infer<typeof mealSchema>>,
) => {
  return data.reduce(
    (a, c) => {
      a.calories += c.calories;
      a.carbs += c.carbs;
      a.fat += c.fat;
      a.protein += c.protein;

      return a;
    },
    { calories: 0, carbs: 0, fat: 0, protein: 0 },
  );
};

export const calculateMacroRatiosByCalories = (
  macros: ReturnType<typeof reduceToDailyMacros>,
) => {
  const totalMacroAmount =
    macros.carbs * 4 + macros.fat * 9 + macros.protein * 4 || 1;

  return {
    carbs: (macros.carbs * 4) / totalMacroAmount,
    fat: (macros.fat * 9) / totalMacroAmount,
    protein: (macros.protein * 4) / totalMacroAmount,
  };
};

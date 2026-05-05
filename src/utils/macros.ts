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

export const calculateMacroRatios = (
  macros: ReturnType<typeof reduceToDailyMacros>,
) => {
  const totalMacroWeight = macros.carbs + macros.fat + macros.protein || 1;

  return {
    carbs: macros.carbs / totalMacroWeight,
    fat: macros.fat / totalMacroWeight,
    protein: macros.protein / totalMacroWeight,
  };
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import z from "zod";
import { toTimezoneAwareISOString } from "../utils/date";

import { MEALS_KEY } from "./keys";
import { createMealTemplateSchema } from "./meal-templates";

export const createMealSchema = z.intersection(
  createMealTemplateSchema,
  z.object({ date: z.string() }),
);

export const mealSchema = z.intersection(
  createMealSchema,
  z.object({ id: z.number() }),
);

export const useAddMeal = () => {
  const db = useSQLiteContext();
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (args: z.infer<typeof createMealSchema>) => {
      await db.runAsync(
        `
          INSERT INTO meals(
            calories,
            carbs,
            date,
            fat,
            name,
            protein
          )
          VALUES(?, ?, ?, ?, ?, ?);
        `,
        [
          args.calories,
          args.carbs,
          args.date,
          args.fat,
          args.name,
          args.protein,
        ],
      );
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [MEALS_KEY] });
    },
  });
};

export const useDeleteMeal = () => {
  const db = useSQLiteContext();
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await db.runAsync("DELETE FROM meals WHERE id = ?;", id);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [MEALS_KEY] });
    },
  });
};

export const useMeals = (props: { end: Date; start: Date }) => {
  const db = useSQLiteContext();
  const startString = toTimezoneAwareISOString(props.start);
  const endString = toTimezoneAwareISOString(props.end);

  return useQuery({
    queryFn: async () => {
      return await db.getAllAsync(
        `
          SELECT * FROM meals
          WHERE date BETWEEN ? AND ?
          ORDER BY date ASC;
        `,
        [startString, endString],
      );
    },
    queryKey: [MEALS_KEY, startString, endString],
    select: z.array(mealSchema).parse,
  });
};

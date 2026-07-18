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

export type Meal = z.infer<typeof mealSchema>;
export type NewMeal = Omit<Meal, "id">;

export const useAddMeal = () => {
  const db = useSQLiteContext();
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (args: NewMeal) => {
      const statement = db.prepareSync(`
        INSERT INTO meals (
          calories, carbs, date, fat, fiber, name, protein, sugar
        )
        VALUES (
          $calories, $carbs, $date, $fat, $fiber, $name, $protein, $sugar
        );
      `);

      try {
        statement.executeSync({
          $calories: args.calories,
          $carbs: args.carbs,
          $date: args.date,
          $fat: args.fat,
          $fiber: args.fiber,
          $name: args.name,
          $protein: args.protein,
          $sugar: args.sugar,
        });
      } finally {
        statement.finalizeSync();
      }
    },
    onSuccess: () => client.invalidateQueries({ queryKey: [MEALS_KEY] }),
  });
};

export const useDeleteMeal = () => {
  const db = useSQLiteContext();
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const statement = db.prepareSync("DELETE FROM meals WHERE id = $id;");

      try {
        statement.executeSync({ $id: id });
      } finally {
        statement.finalizeSync();
      }
    },
    onSuccess: () => client.invalidateQueries({ queryKey: [MEALS_KEY] }),
  });
};

export const useMeals = (props: { end: Date; start: Date }) => {
  const db = useSQLiteContext();
  const startString = toTimezoneAwareISOString(props.start);
  const endString = toTimezoneAwareISOString(props.end);

  return useQuery({
    queryFn: () => {
      const statement = db.prepareSync(`
        SELECT * FROM meals
        WHERE date BETWEEN $start AND $end
        ORDER BY date ASC;  
      `);

      try {
        return statement
          .executeSync({ $end: endString, $start: startString })
          .getAllSync();
      } finally {
        statement.finalizeSync();
      }
    },
    queryKey: [MEALS_KEY, startString, endString],
    select: z.array(mealSchema).parse,
  });
};

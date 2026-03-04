import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import z from "zod";
import { endOfDay, startOfDay, toDBString } from "../lib/utils/date";
import { type createMealSchema, mealSchema } from "../schemas/meal";

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
          toDBString(args.date),
          args.fat,
          args.name,
          args.protein,
        ],
      );
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["meals"] });
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
      client.invalidateQueries({ queryKey: ["meals"] });
    },
  });
};

export const useMeals = (props: { end: Date; start: Date }) => {
  const db = useSQLiteContext();
  const startString = toDBString(startOfDay(props.start));
  const endString = toDBString(endOfDay(props.end));

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
    queryKey: ["meals", startString, endString],
    select: z.array(mealSchema).parse,
  });
};

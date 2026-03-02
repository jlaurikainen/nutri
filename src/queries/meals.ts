import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import z from "zod";
import { endOfDay, startOfDay, toDBString } from "../lib/utils/date";
import { mealSchema } from "../schemas/meal";

export const useMeals = (
  props: { end: Date; start: Date } = { end: new Date(), start: new Date() },
) => {
  const db = useSQLiteContext();
  const startString = toDBString(startOfDay(props.start));
  const endString = toDBString(endOfDay(props.end));

  return useQuery({
    queryFn: async () => {
      return db.getAllAsync(
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

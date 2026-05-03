import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import z from "zod";
import { USER_WEIGHT_KEY } from "./keys";

const userWeightSchema = z.object({
  date: z.string(),
  id: z.number(),
  weight: z.number(),
});

export const useUserWeight = () => {
  const db = useSQLiteContext();

  return useQuery({
    queryFn: async () =>
      await db.getFirstAsync("SELECT * FROM user_weights ORDER BY date DESC"),
    queryKey: [USER_WEIGHT_KEY],
    select: userWeightSchema.parse,
  });
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import z from "zod";
import { USER_WEIGHT_KEY, USER_WEIGHTS_KEY } from "./keys";

export const userWeightSchema = z.object({
  date: z.string(),
  id: z.number(),
  weight: z.number(),
});

export const useAddWeightMeasurement = () => {
  const client = useQueryClient();
  const db = useSQLiteContext();

  return useMutation({
    mutationFn: async (weight: number) =>
      db.sql`
        INSERT INTO user_weights (
          date,
          weight
        )
        VALUES (datetime('now'), ${weight});
      `,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [USER_WEIGHT_KEY] });
      client.invalidateQueries({ queryKey: [USER_WEIGHTS_KEY] });
    },
  });
};

export const useDeleteWeightMeasurement = () => {
  const client = useQueryClient();
  const db = useSQLiteContext();

  return useMutation({
    mutationFn: async (id: number) =>
      db.sql`DELETE FROM user_weights WHERE id = ${id};`,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [USER_WEIGHT_KEY] });
      client.invalidateQueries({ queryKey: [USER_WEIGHTS_KEY] });
    },
  });
};

export const useUserWeight = () => {
  const db = useSQLiteContext();

  return useQuery({
    queryFn: () =>
      db.sql`SELECT * FROM user_weights ORDER BY date DESC;`.firstSync(),
    queryKey: [USER_WEIGHT_KEY],
    select: userWeightSchema.parse,
  });
};

export const useUserWeights = (props: { limit?: number }) => {
  const db = useSQLiteContext();

  const limit = props.limit ?? 7;

  return useQuery({
    queryFn: () =>
      db.sql`
        SELECT * FROM user_weights
        ORDER BY date DESC
        LIMIT ${limit};
      `.allSync(),
    queryKey: [USER_WEIGHTS_KEY, props.limit],
    select: z.array(userWeightSchema).parse,
  });
};

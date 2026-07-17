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
    mutationFn: async (weight: number) => {
      const statement = db.prepareSync(`
          INSERT INTO user_weights (
            date, weight
          )
          VALUES (
            datetime('now'), $weight
          );
        `);

      try {
        statement.executeSync({ $weight: weight });
      } finally {
        statement.finalizeSync();
      }
    },
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
    mutationFn: async (id: number) => {
      const statement = db.prepareSync(
        "DELETE FROM user_weights WHERE id = $id;",
      );

      try {
        statement.executeSync({ $id: id });
      } finally {
        statement.finalizeSync();
      }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [USER_WEIGHT_KEY] });
      client.invalidateQueries({ queryKey: [USER_WEIGHTS_KEY] });
    },
  });
};

export const useUserWeight = () => {
  const db = useSQLiteContext();

  return useQuery({
    queryFn: () => {
      const statement = db.prepareSync(
        "SELECT * FROM user_weights ORDER BY date DESC;",
      );

      try {
        return statement.executeSync().getFirstSync();
      } finally {
        statement.finalizeSync();
      }
    },
    queryKey: [USER_WEIGHT_KEY],
    select: userWeightSchema.parse,
  });
};

export const useUserWeights = (limit = 7) => {
  const db = useSQLiteContext();

  return useQuery({
    queryFn: () => {
      const statement = db.prepareSync(
        "SELECT * FROM user_weights ORDER BY date DESC LIMIT $limit;",
      );

      try {
        return statement.executeSync({ $limit: limit }).getAllSync();
      } finally {
        statement.finalizeSync();
      }
    },
    queryKey: [USER_WEIGHTS_KEY, limit],
    select: z.array(userWeightSchema).parse,
  });
};

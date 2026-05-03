import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import z from "zod";
import { toTimezoneAwareISOStringWithTime } from "../utils/date";
import { USER_WEIGHT_KEY, USER_WEIGHTS_KEY } from "./keys";

const userWeightSchema = z.object({
  date: z.string(),
  id: z.number(),
  weight: z.number(),
});

export const useUserWeight = () => {
  const db = useSQLiteContext();

  return useQuery({
    queryFn: async () =>
      await db.getFirstAsync("SELECT * FROM user_weights ORDER BY date DESC;"),
    queryKey: [USER_WEIGHT_KEY],
    select: userWeightSchema.parse,
  });
};

export const useUserWeights = (props: { end: Date; start: Date }) => {
  const db = useSQLiteContext();
  const startString = toTimezoneAwareISOStringWithTime(props.start);
  const endString = toTimezoneAwareISOStringWithTime(props.end);

  return useQuery({
    queryFn: async () =>
      await db.getAllAsync(
        `
          SELECT * FROM user_weights
          WHERE date BETWEEN ? and ?
          ORDER BY date DESC;
        `,
        [startString, endString],
      ),
    queryKey: [USER_WEIGHTS_KEY],
    select: z.array(userWeightSchema).parse,
  });
};

export const useAddWeightMeasurement = () => {
  const client = useQueryClient();
  const db = useSQLiteContext();

  return useMutation({
    mutationFn: async (weight: number) =>
      await db.runAsync(
        `
          INSERT INTO user_weights (
            date,
            weight
          )
          VALUES (date('now'), ?);
        `,
        [weight],
      ),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [USER_WEIGHT_KEY] });
      client.invalidateQueries({ queryKey: [USER_WEIGHTS_KEY] });
    },
  });
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import z from "zod";
import { calculateBMR } from "../utils/user";
import { USER_KEY } from "./keys";
import { useUserWeight } from "./user-weight";

export const userSchema = z.object({
  activity: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  age: z.number(),
  height: z.number(),
  id: z.number(),
  sex: z.union([z.literal(0), z.literal(1)]),
});

export type User = z.infer<typeof userSchema>;

export const useUpdateUser = () => {
  const client = useQueryClient();
  const db = useSQLiteContext();

  return useMutation({
    mutationFn: async (args: User) => {
      const statement = db.prepareSync(`
        UPDATE user SET
          activity = $activity, age = $age, height = $height, sex = $sex
        WHERE id = $id;
      `);

      try {
        statement.executeSync({
          $activity: args.activity,
          $age: args.age,
          $height: args.height,
          $id: args.id,
          $sex: args.sex,
        });
      } finally {
        statement.finalizeSync();
      }
    },
    onSuccess: () => client.invalidateQueries({ queryKey: [USER_KEY] }),
  });
};

export const useUser = () => {
  const db = useSQLiteContext();

  return useQuery({
    queryFn: () => {
      const statement = db.prepareSync("SELECT * FROM user;");

      try {
        return statement.executeSync().getFirstSync();
      } finally {
        statement.finalizeSync();
      }
    },
    queryKey: [USER_KEY],
    select: userSchema.parse,
  });
};

export const useUserBMR = () => {
  const { data: userData } = useUser();
  const { data: weightData } = useUserWeight();

  return calculateBMR(userData, weightData?.weight);
};

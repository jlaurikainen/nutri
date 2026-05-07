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
    mutationFn: async (args: User) =>
      db.sql`
        UPDATE user
        SET
          activity = ${args.activity},
          age = ${args.age},
          height = ${args.height},
          sex = ${args.sex}
        WHERE id = ${args.id};
      `,
    onSuccess: () => client.invalidateQueries({ queryKey: [USER_KEY] }),
  });
};

export const useUser = () => {
  const db = useSQLiteContext();

  return useQuery({
    queryFn: () => db.sql`SELECT * FROM user;`.firstSync(),
    queryKey: [USER_KEY],
    select: userSchema.parse,
  });
};

export const useUserBMR = () => {
  const { data: userData } = useUser();
  const { data: weightData } = useUserWeight();

  return calculateBMR(userData, weightData?.weight);
};

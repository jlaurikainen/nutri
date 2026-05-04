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

export const useUser = () => {
  const db = useSQLiteContext();

  return useQuery({
    queryFn: () => db.getFirstSync("SELECT * FROM user;"),
    queryKey: [USER_KEY],
    select: userSchema.parse,
  });
};

export const useUpdateUser = () => {
  const client = useQueryClient();
  const db = useSQLiteContext();

  return useMutation({
    mutationFn: async (args: User) =>
      db.runSync(
        `
          UPDATE user
          SET
            activity = ?,
            age = ?,
            height = ?,
            sex = ?
          WHERE id = ?;
        `,
        [args.activity, args.age, args.height, args.sex, args.id],
      ),
    onSuccess: () => client.invalidateQueries({ queryKey: [USER_KEY] }),
  });
};

export const useUserBMR = () => {
  const { data: userData } = useUser();
  const { data: weightData } = useUserWeight();

  return calculateBMR(userData, weightData?.weight);
};

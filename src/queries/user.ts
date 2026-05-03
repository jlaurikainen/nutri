import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import z from "zod";
import { USER_KEY } from "./keys";

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
    queryFn: async () => {
      return await db.getFirstAsync("SELECT * FROM user;");
    },
    queryKey: [USER_KEY],
    select: userSchema.parse,
  });
};

export const useUpdateUser = () => {
  const client = useQueryClient();
  const db = useSQLiteContext();

  return useMutation({
    mutationFn: async (args: User) => {
      await db.runAsync(
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
      );
    },
    onSuccess: () => client.invalidateQueries({ queryKey: [USER_KEY] }),
  });
};

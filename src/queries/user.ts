import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import z from "zod";
import { USER_KEY } from "./keys";

const userSchema = z.object({
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

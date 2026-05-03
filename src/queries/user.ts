import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import z from "zod";
import { USER_KEY } from "./keys";

const userSchema = z.object({
  activity: z.number(),
  age: z.number(),
  height: z.number(),
  id: z.number(),
  sex: z.number(),
});

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

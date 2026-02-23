import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";

export const useMealTemplates = () => {
  const db = useSQLiteContext();

  return useQuery({
    queryFn: async () => await db.getAllAsync("SELECT * FROM meal_templates;"),
    queryKey: ["meal-templates"],
  });
};

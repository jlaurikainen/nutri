import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import type { z } from "zod";
import type {
  createMealTemplateSchema,
  updateMealTemplateSchema,
} from "../schemas/meal-templates";

export type MealTemplate = z.infer<typeof updateMealTemplateSchema>;

export const useCreateMealTemplate = () => {
  const client = useQueryClient();
  const db = useSQLiteContext();

  return useMutation({
    mutationFn: async (args: z.infer<typeof createMealTemplateSchema>) => {
      await db.runAsync(
        `
          INSERT INTO meal_templates(
            calories,
            carbs,
            fat,
            name,
            protein
          )
          VALUES(?, ?, ?, ?, ?);
        `,
        [args.calories, args.carbs, args.fat, args.name, args.protein],
      );
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["meal-templates"] });
    },
  });
};

export const useDeleteMealTemplate = () => {
  const client = useQueryClient();
  const db = useSQLiteContext();

  return useMutation({
    mutationFn: async (id: number) => {
      return await db.runAsync("DELETE FROM meal_templates WHERE id = ?;", id);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["meal-templates"] });
    },
  });
};

export const useMealTemplate = (id: number) => {
  const db = useSQLiteContext();

  return useQuery<MealTemplate | null>({
    queryFn: async () => {
      return await db.getFirstAsync(
        "SELECT * FROM meal_templates WHERE id = ?;",
        id,
      );
    },
    queryKey: ["meal-template", id],
  });
};

export const useMealTemplates = () => {
  const db = useSQLiteContext();

  return useQuery<MealTemplate[]>({
    queryFn: async () => {
      return await db.getAllAsync("SELECT * FROM meal_templates ORDER_BY;");
    },
    queryKey: ["meal-templates"],
  });
};

export const useUpdateMealTemplate = () => {
  const client = useQueryClient();
  const db = useSQLiteContext();

  return useMutation({
    mutationFn: async (args: z.infer<typeof updateMealTemplateSchema>) => {
      await db.runAsync(
        `
          UPDATE meal_templates
          SET
            calories = ?,
            carbs = ?,
            fat = ?,
            name = ?,
            protein = ?
          WHERE id = ?;
        `,
        [args.calories, args.carbs, args.fat, args.name, args.protein, args.id],
      );
    },
    onSuccess: (_, args) => {
      client.invalidateQueries({ queryKey: ["meal-template", args.id] });
      client.invalidateQueries({ queryKey: ["meal-templates"] });
    },
  });
};

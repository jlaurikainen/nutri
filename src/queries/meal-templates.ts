import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { z } from "zod";

export const createTemplateSchema = z.object({
  calories: z.number(),
  carbs: z.number(),
  fat: z.number(),
  name: z.string(),
  protein: z.number(),
});

export type CreateTemplateProps = z.infer<typeof createTemplateSchema>;

export const updateTemplateSchema = z.intersection(
  createTemplateSchema,
  z.object({
    id: z.number(),
  }),
);

export type UpdateTemplateProps = z.infer<typeof updateTemplateSchema>;

export type MealTemplate = UpdateTemplateProps;

export const useCreateMealTemplate = () => {
  const client = useQueryClient();
  const db = useSQLiteContext();

  return useMutation({
    mutationFn: async (args: CreateTemplateProps) => {
      await db.runAsync(
        `
          INSERT INTO meal_templates(
            calories,
            carbs,
            fat
            name,
            protein,
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

  return useQuery({
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
    mutationFn: async (args: UpdateTemplateProps) => {
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

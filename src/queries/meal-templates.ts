import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { z } from "zod";
import { MULTI_TEMPLATE_KEY, SINGLE_TEMPLATE_KEY } from "./keys";

export const createMealTemplateSchema = z.object({
  calories: z.number(),
  carbs: z.number(),
  fat: z.number(),
  name: z.string(),
  protein: z.number(),
});

export const mealTemplateSchema = z.intersection(
  createMealTemplateSchema,
  z.object({ id: z.number() }),
);

export const useCreateMealTemplate = () => {
  const client = useQueryClient();
  const db = useSQLiteContext();

  return useMutation({
    mutationFn: async (args: z.infer<typeof createMealTemplateSchema>) =>
      db.sql`
        INSERT INTO meal_templates(
          calories,
          carbs,
          fat,
          name,
          protein
        )
        VALUES (
          ${args.calories},
          ${args.carbs},
          ${args.fat},
          ${args.name},
          ${args.protein}
        );
      `,
    onSuccess: () =>
      client.invalidateQueries({ queryKey: [MULTI_TEMPLATE_KEY] }),
  });
};

export const useDeleteMealTemplate = () => {
  const client = useQueryClient();
  const db = useSQLiteContext();

  return useMutation({
    mutationFn: async (id: number) =>
      db.sql`DELETE FROM meal_templates WHERE id = ${id};`,
    onSuccess: () =>
      client.invalidateQueries({ queryKey: [MULTI_TEMPLATE_KEY] }),
  });
};

export const useMealTemplate = (id: number) => {
  const db = useSQLiteContext();

  return useQuery({
    queryFn: () =>
      db.sql`SELECT * FROM meal_templates WHERE id = ${id};`.firstSync(),
    queryKey: [SINGLE_TEMPLATE_KEY, id],
    select: mealTemplateSchema.parse,
  });
};

export const useMealTemplates = () => {
  const db = useSQLiteContext();

  return useQuery({
    queryFn: () =>
      db.sql`SELECT * FROM meal_templates ORDER BY name ASC;`.allSync(),
    queryKey: [MULTI_TEMPLATE_KEY],
    select: z.array(mealTemplateSchema).parse,
  });
};

export const useUpdateMealTemplate = () => {
  const client = useQueryClient();
  const db = useSQLiteContext();

  return useMutation({
    mutationFn: async (args: z.infer<typeof mealTemplateSchema>) =>
      db.sql`
        UPDATE meal_templates
        SET
          calories = ${args.calories},
          carbs = ${args.carbs},
          fat = ${args.fat},
          name = ${args.name},
          protein = ${args.protein}
        WHERE id = ${args.id};
      `,
    onSuccess: (_, args) => {
      client.invalidateQueries({ queryKey: [SINGLE_TEMPLATE_KEY, args.id] });
      client.invalidateQueries({ queryKey: [MULTI_TEMPLATE_KEY] });
    },
  });
};

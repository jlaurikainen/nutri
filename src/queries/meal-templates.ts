import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import { z } from "zod";
import { MULTI_TEMPLATE_KEY, SINGLE_TEMPLATE_KEY } from "./keys";

export const createMealTemplateSchema = z.object({
  calories: z.number(),
  carbs: z.number(),
  fat: z.number(),
  fiber: z.number(),
  name: z.string(),
  protein: z.number(),
  sugar: z.number(),
});

export const mealTemplateSchema = z.intersection(
  createMealTemplateSchema,
  z.object({ id: z.number() }),
);

export type MealTemplate = z.infer<typeof mealTemplateSchema>;
export type NewMealTemplate = Omit<MealTemplate, "id">;

export const useCreateMealTemplate = () => {
  const client = useQueryClient();
  const db = useSQLiteContext();

  return useMutation({
    mutationFn: async (args: NewMealTemplate) => {
      const statement = db.prepareSync(`
        INSERT INTO meal_templates (
          calories, carbs, fat, fiber, name, protein, sugar
        )
        VALUES (
          $calories, $carbs, $fat, $fiber, $name, $protein, $sugar
        );`);

      try {
        statement.executeSync({
          $calories: args.calories,
          $carbs: args.carbs,
          $fat: args.fat,
          $fiber: args.fiber,
          $name: args.name,
          $protein: args.protein,
          $sugar: args.sugar,
        });
      } finally {
        statement.finalizeSync();
      }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [MULTI_TEMPLATE_KEY] });
    },
  });
};

export const useDeleteMealTemplate = () => {
  const client = useQueryClient();
  const db = useSQLiteContext();

  return useMutation({
    mutationFn: async (id: number) => {
      const statement = db.prepareSync(
        "DELETE FROM meal_templates WHERE id = $id;",
      );

      try {
        statement.executeSync({ $id: id });
      } finally {
        statement.finalizeSync();
      }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [MULTI_TEMPLATE_KEY] });
    },
  });
};

export const useMealTemplate = (id: number) => {
  const db = useSQLiteContext();

  return useQuery({
    queryFn: () => {
      const statement = db.prepareSync(
        "SELECT * FROM meal_templates WHERE id = $id;",
      );

      try {
        return statement.executeSync({ $id: id }).getFirstSync();
      } finally {
        statement.finalizeSync();
      }
    },
    queryKey: [SINGLE_TEMPLATE_KEY, id],
    select: mealTemplateSchema.parse,
  });
};

export const useMealTemplates = () => {
  const db = useSQLiteContext();

  return useQuery({
    queryFn: () => {
      const statement = db.prepareSync(
        "SELECT * FROM meal_templates ORDER BY name ASC;",
      );

      try {
        return statement.executeSync().getAllSync();
      } finally {
        statement.finalizeSync();
      }
    },
    queryKey: [MULTI_TEMPLATE_KEY],
    select: z.array(mealTemplateSchema).parse,
  });
};

export const useUpdateMealTemplate = () => {
  const client = useQueryClient();
  const db = useSQLiteContext();

  return useMutation({
    mutationFn: async (args: MealTemplate) => {
      const statement = db.prepareSync(`
        UPDATE meal_templates SET
          calories = $calories, carbs = $carbs, fat = $fat, fiber = $fiber, name = $name, protein = $protein, sugar = $sugar
        WHERE id = $id;
      `);

      try {
        statement.executeSync({
          $calories: args.calories,
          $carbs: args.carbs,
          $fat: args.fat,
          $fiber: args.fiber,
          $id: args.id,
          $name: args.name,
          $protein: args.protein,
          $sugar: args.sugar,
        });
      } finally {
        statement.finalizeSync();
      }
    },
    onSuccess: (_, args) => {
      client.invalidateQueries({ queryKey: [SINGLE_TEMPLATE_KEY, args.id] });
      client.invalidateQueries({ queryKey: [MULTI_TEMPLATE_KEY] });
    },
  });
};

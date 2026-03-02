import z from "zod";
import { toNumber } from "../lib/utils/number";

export const createMealTemplateSchema = z.object({
  calories: z.number(),
  carbs: z.number(),
  fat: z.number(),
  name: z.string(),
  protein: z.number(),
});

export const mealTemplateFormSchema = z.object({
  calories: z.string().transform(toNumber),
  carbs: z.string().transform(toNumber),
  fat: z.string().transform(toNumber),
  name: z.string(),
  protein: z.string().transform(toNumber),
});

export const mealTemplateSchema = z.intersection(
  createMealTemplateSchema,
  z.object({
    id: z.number(),
  }),
);

import z from "zod";
import { toNumber } from "../utils/number";

export const createMealTemplateSchema = z.object({
  calories: z.number(),
  carbs: z.number(),
  fat: z.number(),
  name: z.string(),
  protein: z.number(),
});

export const mealTemplateSchema = z.object({
  calories: z.string().transform(toNumber),
  carbs: z.string().transform(toNumber),
  fat: z.string().transform(toNumber),
  name: z.string(),
  protein: z.string().transform(toNumber),
});

export const updateMealTemplateSchema = z.intersection(
  createMealTemplateSchema,
  z.object({
    id: z.number(),
  }),
);

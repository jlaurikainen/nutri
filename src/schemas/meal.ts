import z from "zod";
import { createMealTemplateSchema } from "./meal-templates";

export const createMealSchema = z.intersection(
  createMealTemplateSchema,
  z.object({ date: z.date() }),
);

export const mealSchema = z.intersection(
  createMealSchema,
  z.object({ id: z.number() }),
);

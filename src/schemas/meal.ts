import z from "zod";
import { fromDBString } from "../lib/utils/date";
import { createMealTemplateSchema } from "./meal-templates";

export const createMealSchema = z.intersection(
  createMealTemplateSchema,
  z.object({ date: z.string().transform(fromDBString) }),
);

export const mealSchema = z.intersection(
  createMealSchema,
  z.object({ id: z.number() }),
);

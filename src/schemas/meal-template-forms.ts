import z from "zod";
import { toNumber } from "../utils/number";

export const mealTemplateSchema = z.object({
  calories: z.string().transform(toNumber),
  carbs: z.string().transform(toNumber),
  fat: z.string().transform(toNumber),
  name: z.string(),
  protein: z.string().transform(toNumber),
});

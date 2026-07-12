import z from "zod";
import { toDate } from "./date";

export const limitSchema = z.object({
  limit: z.union([z.literal("7"), z.literal("30")]).optional(),
});

export const querySchema = z.object({ query: z.string().optional() });

export const pathIdSchema = z.object({ id: z.string() });

export const pathDateSchema = z.object({
  date: z.string().transform(toDate),
});

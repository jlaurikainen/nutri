import z from "zod";
import { toDate } from "./date";
import { toNumber } from "./number";

export const limitSchema = z.object({
  limit: z.union([z.literal("7"), z.literal("30")]).optional(),
});

export const querySchema = z.object({ query: z.string().optional() });

export const pathIdSchema = z.object({
  id: z.string().transform((x) => toNumber(x)),
});

export const pathDateSchema = z.object({
  date: z.string().transform(toDate),
});

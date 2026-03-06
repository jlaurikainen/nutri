import z from "zod";

export const querySchema = z.object({ query: z.string().optional() });

export const pathIdSchema = z.object({ id: z.string() });

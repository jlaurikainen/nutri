import { useLocalSearchParams } from "expo-router";
import type { ZodType } from "zod";

export const useParsedLocalParams = <T extends ZodType>(schema: T) => {
  return schema.parse(useLocalSearchParams());
};

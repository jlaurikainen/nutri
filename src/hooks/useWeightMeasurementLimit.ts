import { limitSchema } from "../utils/search-params";
import { useParsedLocalParams } from "./useParsedLocalParams";

const LIMIT_STRINGS = {
  "7": "Past Week",
  "30": "Past Month",
} as const;

export const useWeightMeasurementLimit = () => {
  const { limit = "7" } = useParsedLocalParams(limitSchema);

  return { label: LIMIT_STRINGS[limit], limit: Number(limit) };
};

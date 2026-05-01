import { useParsedLocalParams } from "@/src/hooks/useParsedLocalParams";
import { querySchema } from "@/src/utils/search-params";
import { useMealTemplates } from "../../queries/meal-templates";

export const useFilteredMealTempaltes = () => {
  const { query = "" } = useParsedLocalParams(querySchema);
  const { data = [] } = useMealTemplates();

  return data.filter((x) => x.name.toLowerCase().includes(query.toLowerCase()));
};

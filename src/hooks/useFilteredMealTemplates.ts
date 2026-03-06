import { useLocalSearchParams } from "expo-router";
import { useMealTemplates } from "../queries/meal-templates";

export const useFilteredMealTempaltes = () => {
  const { query = "" } = useLocalSearchParams<{ query?: string }>();
  const { data = [] } = useMealTemplates();

  return data.filter((x) => x.name.toLowerCase().includes(query.toLowerCase()));
};

import { useState } from "react";
import { useMealTemplates } from "../queries/meal-templates";

export const useFilteredTemplates = () => {
  const [filter, setFilter] = useState("");
  const { data } = useMealTemplates();

  const filteredData =
    data?.filter(
      (x) =>
        x.name.toLowerCase().startsWith(filter.toLowerCase()) ||
        x.name.toLowerCase().includes(filter.toLowerCase()),
    ) ?? [];

  const updateFilter = (x: string) => setFilter(x);

  const resetFilter = () => setFilter("");

  return { filter, filteredData, resetFilter, updateFilter };
};

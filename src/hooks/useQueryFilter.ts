import { useRouter } from "expo-router";

export const useQueryFilter = () => {
  const router = useRouter();

  const clearQuery = () => router.setParams({ query: "" });

  const updateQuery = (query: string) => router.setParams({ query });

  return { clearQuery, updateQuery };
};

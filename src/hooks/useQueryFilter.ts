import { useRouter } from "expo-router";

export const useQueryFilter = () => {
  const router = useRouter();

  const clearQuery = () => router.setParams({ query: "" });

  const updateQuery = (x: string) => router.setParams({ query: x });

  return { clearQuery, updateQuery };
};

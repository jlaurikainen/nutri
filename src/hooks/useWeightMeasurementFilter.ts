import { useRouter } from "expo-router";

export const useWeightMeasurementFilter = () => {
  const router = useRouter();

  const updateLimit = (limit: "7" | "30") => router.setParams({ limit });

  return { updateLimit };
};

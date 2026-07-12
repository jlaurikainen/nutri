import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { useWeightMeasurementFilter } from "@/src/hooks/useWeightMeasurementFilter";
import { useWeightMeasurementLimit } from "@/src/hooks/useWeightMeasurementLimit";
import { useUserWeights } from "@/src/queries/user-weight";
import { Button } from "../shared/button";
import { LineChart } from "../shared/line-chart";
import { Text } from "../shared/text";

const LIMITS = ["7", "30"] as const;

export const WeightData = () => {
  const { label, limit } = useWeightMeasurementLimit();
  const { updateLimit } = useWeightMeasurementFilter();
  const { data: weightData = [] } = useUserWeights({ limit });

  const chartData = weightData
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((a: Record<string, number>, c) => {
      if (!a[c.date]) {
        a[c.date] = c.weight;
      }

      return a;
    }, {});

  const onUpdateLimit = () => {
    const index = limit.toString() === "7" ? 1 : 0;

    updateLimit(LIMITS[index]);
  };

  return (
    <View className="gap-1">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm">Recent Weight Measurements</Text>
        <Button onPress={onUpdateLimit} size="sm" variant="bordered">
          <Text>{label}</Text>
        </Button>
      </View>
      <Link asChild href="/user/user-weight">
        <Pressable>
          <LineChart values={chartData} />
        </Pressable>
      </Link>
    </View>
  );
};

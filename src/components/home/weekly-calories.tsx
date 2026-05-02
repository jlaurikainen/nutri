import { View } from "react-native";
import { formatNumber } from "@/src/utils/number";
import { useWeeklyCaloriesSummary } from "../../hooks/useWeeklyCaloriesSummary";
import { BarChart } from "../shared/bar-chart";
import { Text } from "../shared/text";

export function WeeklyCalories() {
  const { weekAverage, weeklyCalories } = useWeeklyCaloriesSummary();

  return (
    <View className="gap-1">
      <BarChart values={weeklyCalories} />
      <Text className="text-center text-sm">
        Average daily calories: {formatNumber(weekAverage, 0)}kcal
      </Text>
    </View>
  );
}

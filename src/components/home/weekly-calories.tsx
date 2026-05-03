import { View } from "react-native";
import { useUserBMR } from "@/src/queries/user";
import { formatNumber } from "@/src/utils/number";
import { useWeeklyCaloriesSummary } from "../../hooks/useWeeklyCaloriesSummary";
import { BarChart } from "../shared/bar-chart";
import { Text } from "../shared/text";

export function WeeklyCalories() {
  const bmr = useUserBMR();
  const { weekAverage, weeklyCalories } = useWeeklyCaloriesSummary();

  return (
    <View className="gap-1">
      <Text className="text-center text-sm">
        BMR: {formatNumber(bmr, 0)}kcal at Dashed Line
      </Text>
      <BarChart comparisonValue={bmr} values={weeklyCalories} />
      <Text className="text-center text-sm">
        Average daily calories: {formatNumber(weekAverage, 0)}kcal
      </Text>
    </View>
  );
}

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
      <View className="flex-row justify-between">
        <Text className="text-center text-sm">
          {bmr === 0 ? "BMR Data Missing" : `BMR: ${formatNumber(bmr, 0)}kcal`}
        </Text>
        <Text className="text-center text-sm">
          Daily AVG: {formatNumber(weekAverage, 0)}kcal
        </Text>
      </View>
      <BarChart comparisonValue={bmr} values={weeklyCalories} />
    </View>
  );
}

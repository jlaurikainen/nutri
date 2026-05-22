import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { useUserBMR } from "@/src/queries/user";
import { formatNumber } from "@/src/utils/number";
import { useWeeklyCaloriesSummary } from "../../hooks/useWeeklyCaloriesSummary";
import { BarChart } from "../shared/bar-chart";
import { Text } from "../shared/text";

export function WeeklyCalories() {
  const bmr = useUserBMR();
  const { weeklyAverage, weeklyCalories } = useWeeklyCaloriesSummary();

  return (
    <View className="gap-1">
      <View className="flex-row justify-between">
        <Text className="text-center text-sm">
          {bmr === 0 ? "BMR Data Missing" : `BMR: ${formatNumber(bmr, 0)}kcal`}
        </Text>
        <Text className="text-center text-sm">
          Daily AVG: {formatNumber(weeklyAverage, 0)}kcal
        </Text>
      </View>
      <Link asChild href="/meal-templates">
        <Pressable>
          <BarChart
            comparisonValue={bmr}
            getBarKey={(x) => x.date}
            getBarLabel={(x) => formatNumber(x.calories, 0)}
            getBarValue={(x) => x.calories}
            values={weeklyCalories}
          />
        </Pressable>
      </Link>
    </View>
  );
}

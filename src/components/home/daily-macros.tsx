import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { useMeals } from "@/src/queries/meals";
import { toTimezoneAwareISOString } from "@/src/utils/date";
import {
  calculateMacroRatiosByCalories,
  reduceToDailyMacros,
} from "@/src/utils/macros";
import { Insight } from "../shared/insight";

export const DailyMacros = () => {
  const { data = [] } = useMeals({ end: new Date(), start: new Date() });

  const macros = reduceToDailyMacros(data);
  const ratios = calculateMacroRatiosByCalories(macros);

  return (
    <Link
      asChild
      href={{
        params: { date: toTimezoneAwareISOString(new Date()) },
        pathname: "/meals/[date]",
      }}
    >
      <Pressable>
        <View className="gap-2">
          <View className="w-full flex-row gap-2">
            <Insight amount={macros.calories} title="Calories" unit="kcal" />
            <Insight
              amount={macros.carbs}
              ratio={ratios.carbs}
              title="Carbs"
              unit="g"
            />
          </View>

          <View className="w-full flex-row gap-2">
            <Insight
              amount={macros.protein}
              ratio={ratios.protein}
              title="Protein"
              unit="g"
            />
            <Insight
              amount={macros.fat}
              ratio={ratios.fat}
              title="Fat"
              unit="g"
            />
          </View>

          <View className="w-full flex-row gap-2">
            <Insight
              amount={macros.sugar}
              title="Sugar"
              unit="g"
              withinRecommendations={macros.sugar < 50}
            />
            <Insight
              amount={macros.fiber}
              title="Fiber"
              unit="g"
              withinRecommendations={macros.fiber > 25 && macros.fiber < 35}
            />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

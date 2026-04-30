import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { toDateOnlyTZISO } from "@/src/lib/date";
import { useMeals } from "@/src/queries/meals";
import { Insight } from "../ui/insight";

export const DailyMacros = () => {
  const { data = [] } = useMeals({ end: new Date(), start: new Date() });

  const totals = data.reduce(
    (a, c) => {
      a.calories += c.calories;
      a.carbs += c.carbs;
      a.fat += c.fat;
      a.protein += c.protein;

      return a;
    },
    { calories: 0, carbs: 0, fat: 0, protein: 0 },
  );

  return (
    <Link
      asChild
      href={{
        params: { date: toDateOnlyTZISO(new Date()) },
        pathname: "/meals/[date]",
      }}
    >
      <Pressable>
        <View className="gap-2">
          <View className="gap-2 flex-row w-full">
            <Insight amount={totals.calories} title="Calories" unit="kcal" />
            <Insight amount={totals.carbs} title="Carbs" unit="g" />
          </View>

          <View className="gap-2 flex-row w-full">
            <Insight amount={totals.protein} title="Protein" unit="g" />
            <Insight amount={totals.fat} title="Fat" unit="g" />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { useUserWeights } from "@/src/queries/user-weight";
import { addDays, endOfDay, startOfDay } from "@/src/utils/date";
import { LineChart } from "../shared/line-chart";
import { Text } from "../shared/text";

const TODAY = endOfDay(new Date());
const WEEK_AGO = startOfDay(addDays(TODAY, -6));

export const WeightData = () => {
  const { data: weightData = [] } = useUserWeights({
    end: TODAY,
    start: WEEK_AGO,
  });

  const chartData = weightData
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((a: Record<string, number>, c) => {
      if (!a[c.date]) {
        a[c.date] = c.weight;
      }

      return a;
    }, {});

  return (
    <View className="gap-1">
      <Text className="text-sm">Recent Weight Measurements</Text>
      <Link asChild href="/user/user-weight">
        <Pressable>
          <LineChart values={chartData} />
        </Pressable>
      </Link>
    </View>
  );
};

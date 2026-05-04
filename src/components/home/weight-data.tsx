import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { useUserWeights } from "@/src/queries/user-weight";
import { addDays, endOfDay, startOfDay } from "@/src/utils/date";
import { LineChart } from "../shared/line-chart";

const TODAY = endOfDay(new Date());
const WEEK_AGO = startOfDay(addDays(TODAY, -6));

export const WeightData = () => {
  const { data: weightData = [] } = useUserWeights({
    end: TODAY,
    start: WEEK_AGO,
  });

  const chartData = weightData.reduce((a: Record<string, number>, c) => {
    if (!a[c.date]) {
      a[c.date] = c.weight;
    }

    return a;
  }, {});

  return (
    <View>
      <Link asChild href="/user/user-weight">
        <Pressable>
          <LineChart values={chartData} />
        </Pressable>
      </Link>
    </View>
  );
};

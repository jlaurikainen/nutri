import { Fragment } from "react";
import { View } from "react-native";
import Svg, { Line, Rect, Text as SVGText } from "react-native-svg";
import { toDateMonthString } from "@/src/lib/utils/date";
import { formatNumber } from "@/src/lib/utils/number";
import { Text } from "../ui/text";
import { useWeeklyCaloriesSummary } from "./useWeeklyCaloriesSummary";

const BAR_Y_OFFSET = 720,
  BAR_WIDTH = 180,
  CHART_HEIGHT = 900,
  CHART_WIDTH = 1600,
  LEGEND_X_OFFSET = 150,
  LEGEND_Y = 760,
  MAX_CALORIES = 3000,
  VALUE_GAP = 32,
  VALUE_X_OFFSET = BAR_WIDTH / 2;

export function WeeklyCalories() {
  const { weekAverage, weeklyCalories } = useWeeklyCaloriesSummary();

  return (
    <View className="aspect-video">
      <Svg
        height="100%"
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        width="100%"
      >
        <Rect fill="#181818" height="100%" width="100%" x={0} y={0} />
        {Object.entries(weeklyCalories).map(([key, value], i, self) => (
          <Fragment key={key}>
            <SVGText
              fill="#fff"
              fontSize={50}
              textAnchor="middle"
              x={
                i * (CHART_WIDTH / self.length) +
                (CHART_WIDTH / self.length / 2 - BAR_WIDTH / 2) +
                VALUE_X_OFFSET
              }
              y={
                BAR_Y_OFFSET -
                ((BAR_Y_OFFSET / MAX_CALORIES) * value + VALUE_GAP)
              }
            >
              {formatNumber(value, 0)}
            </SVGText>
            <Rect
              fill="#eee"
              height={(BAR_Y_OFFSET / MAX_CALORIES) * value}
              width={BAR_WIDTH}
              x={
                i * (CHART_WIDTH / self.length) +
                (CHART_WIDTH / self.length / 2 - BAR_WIDTH / 2)
              }
              y={BAR_Y_OFFSET - (BAR_Y_OFFSET / MAX_CALORIES) * value}
            />
            <SVGText
              fill="#fff"
              fontSize={50}
              textAnchor="end"
              transform={`rotate(-60, ${i * (CHART_WIDTH / self.length) + LEGEND_X_OFFSET}, ${LEGEND_Y})`}
              x={i * (CHART_WIDTH / self.length) + LEGEND_X_OFFSET}
              y={LEGEND_Y}
            >
              {toDateMonthString(new Date(key))}
            </SVGText>
          </Fragment>
        ))}
        <Line
          stroke="#fff"
          strokeWidth={5}
          x1={0}
          x2="100%"
          y1={720}
          y2={720}
        />
      </Svg>

      <Text className="mt-2 text-center">
        Average Daily Calories: {formatNumber(weekAverage, 0)} kcal
      </Text>
    </View>
  );
}

import { Fragment } from "react";
import { View } from "react-native";
import Svg, { Line, Rect, Text as SVGText } from "react-native-svg";
import { formatNumber } from "@/src/lib/number";
import { useWeeklyCaloriesSummary } from "./useWeeklyCaloriesSummary";

const BAR_WIDTH = 180,
  CHART_HEIGHT = 900,
  CHART_WIDTH = 1600,
  MAX_CALORIES = 3000,
  K_LINE = CHART_HEIGHT / (MAX_CALORIES / 1000),
  KK_LINE = 2 * K_LINE,
  VALUE_GAP = 32,
  VALUE_X_OFFSET = BAR_WIDTH / 2;

export function WeeklyCalories() {
  const { weeklyCalories } = useWeeklyCaloriesSummary();

  return (
    <View className="aspect-video">
      <Svg
        height="100%"
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        width="100%"
      >
        <Rect fill="#181818" height="100%" width="100%" x={0} y={0} />
        <Line
          stroke="#666"
          strokeDasharray={25}
          strokeWidth={3}
          x1={0}
          x2="100%"
          y1={K_LINE}
          y2={K_LINE}
        />
        <Line
          stroke="#666"
          strokeDasharray={25}
          strokeWidth={3}
          x1={0}
          x2="100%"
          y1={KK_LINE}
          y2={KK_LINE}
        />
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
                CHART_HEIGHT -
                ((CHART_HEIGHT / MAX_CALORIES) * value + VALUE_GAP)
              }
            >
              {formatNumber(value, 0)}
            </SVGText>
            <Rect
              fill="#eee"
              height={(CHART_HEIGHT / MAX_CALORIES) * value}
              width={BAR_WIDTH}
              x={
                i * (CHART_WIDTH / self.length) +
                (CHART_WIDTH / self.length / 2 - BAR_WIDTH / 2)
              }
              y={CHART_HEIGHT - (CHART_HEIGHT / MAX_CALORIES) * value}
            />
          </Fragment>
        ))}
      </Svg>
    </View>
  );
}

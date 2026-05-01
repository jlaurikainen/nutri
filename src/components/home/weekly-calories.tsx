import { Fragment } from "react";
import { View } from "react-native";
import Svg, { Rect, Text as SVGText } from "react-native-svg";
import { formatNumber } from "@/src/utils/number";
import { useWeeklyCaloriesSummary } from "./useWeeklyCaloriesSummary";

const BAR_WIDTH = 180,
  MAX_VALUE = 3000,
  VALUE_GAP_FROM_BAR = 32,
  VIEWPORT_HEIGHT = 900,
  VIEWPORT_WIDTH = 1600;

export function WeeklyCalories() {
  const { weeklyCalories } = useWeeklyCaloriesSummary();

  return (
    <View className="aspect-video border border-foreground">
      <Svg
        height="100%"
        viewBox={`0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT}`}
        width="100%"
      >
        <Rect fill="#f7fff7" height="100%" id="bg" width="100%" x={0} y={0} />

        {Object.entries(weeklyCalories).map(([key, value], i, self) => {
          const canvasEmptyWidth = VIEWPORT_WIDTH - BAR_WIDTH * self.length; // How much space we have left on the canvas x-axis once the bars are drawn
          const barGap = canvasEmptyWidth / self.length + 1; // How much gap we should have between and around the bars based on the leftover space on the x-axis
          const barRelativeHeight = (VIEWPORT_HEIGHT / MAX_VALUE) * value;
          const barX = barGap + i * ((VIEWPORT_WIDTH - barGap) / self.length); // Shift the bar x-axis position by the barGap amount from both ends of the canvas
          const barY = VIEWPORT_HEIGHT - barRelativeHeight; // Shift the bars to start from the bottom of the canvas

          return (
            <Fragment key={key}>
              <SVGText
                fill="#1c1c1e"
                fontFamily="SpaceGrotesk-Regular"
                fontSize={50}
                textAnchor="middle"
                x={barX + BAR_WIDTH / 2}
                y={barY - VALUE_GAP_FROM_BAR}
              >
                {formatNumber(value, 0)}
              </SVGText>

              <Rect
                fill="#4a4a4a"
                height={barRelativeHeight}
                width={BAR_WIDTH}
                x={barX}
                y={barY}
              />
            </Fragment>
          );
        })}
      </Svg>
    </View>
  );
}

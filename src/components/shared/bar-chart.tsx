import { Fragment } from "react";
import { View } from "react-native";
import Svg, { Rect, Text as SVGText } from "react-native-svg";
import { formatNumber } from "@/src/utils/number";

const BAR_WIDTH = 180,
  RESERVED_VALUE_SPACE = 1 / 5,
  VALUE_FONT_SIZE = 50,
  VALUE_GAP_FROM_BAR = 32,
  VIEWBOX_HEIGHT = 900,
  VIEWBOX_WIDTH = 1600;

interface Props {
  values: Record<string, number>;
}

export const BarChart = (props: Props) => {
  const values = Object.values(props.values);

  // How much space we have left on the canvas x-axis once the bars are drawn
  const canvasEmptyWidth = VIEWBOX_WIDTH - BAR_WIDTH * values.length;

  // How much of a gap we should have between and around the bars based on the leftover space on the x-axis
  const gap = canvasEmptyWidth / values.length + 1;

  const maxCalorieValue = Math.max(...values, 1);

  // Calculate relative viewbox units so that we leave consistent space for the value labels based on maximum displayed value
  const maxValueWithReservedSpace =
    maxCalorieValue + maxCalorieValue * RESERVED_VALUE_SPACE;
  const relativeViewboxUnit = VIEWBOX_HEIGHT / maxValueWithReservedSpace;

  return (
    <View className="aspect-video border border-foreground">
      <Svg
        height="100%"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        width="100%"
      >
        <Rect fill="#f7fff7" height="100%" id="bg" width="100%" x={0} y={0} />

        {Object.entries(props.values).map(([key, value], i, self) => {
          const barRelativeHeight = relativeViewboxUnit * value;
          const barX = gap + i * ((VIEWBOX_WIDTH - gap) / self.length); // Shift the bar x-axis position by the barGap amount from both ends of the canvas
          const barY = VIEWBOX_HEIGHT - barRelativeHeight; // Shift the bars to start from the bottom of the canvas

          return (
            <Fragment key={key}>
              <SVGText
                fill="#1c1c1e"
                fontFamily="SpaceGrotesk-Regular"
                fontSize={VALUE_FONT_SIZE}
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
};

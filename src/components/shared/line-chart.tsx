import { Fragment, useMemo } from "react";
import { View } from "react-native";
import Svg, {
  Circle,
  Line,
  Polyline,
  Rect,
  Text as SVGText,
} from "react-native-svg";
import { toDateAndMonthString } from "@/src/utils/date";
import { formatNumber } from "@/src/utils/number";

const VIEWBOX_HEIGHT = 900,
  VIEWBOX_WIDTH = 1600,
  WIDTH_OFFSET = 100;

interface Props {
  values: Record<string, number>;
}

export const LineChart = (props: Props) => {
  const values = Object.values(props.values);

  const pointCoordinates = useMemo(() => {
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const heightPad = (maxValue - minValue) / 2;

    const xOffsetLeft = values.length === 1 ? VIEWBOX_WIDTH / 2 : WIDTH_OFFSET;
    const xOffsetRight =
      (VIEWBOX_WIDTH - xOffsetLeft * 2) / Math.max(values.length - 1, 1);

    const yOffsetMin = minValue - heightPad;
    const yOffsetMax = maxValue + heightPad;
    const yRange = yOffsetMax - yOffsetMin;

    return values.map((v, i) => {
      const x = xOffsetLeft + xOffsetRight * i;
      const y = (1 - (v - yOffsetMin) / yRange) * VIEWBOX_HEIGHT;

      return { x, y };
    });
  }, [values]);

  const getEntryStrokeColor = (index: number) => {
    switch (true) {
      case values.length < 14:
      case index === 0 || index === values.length - 1:
        return "#4a4a4a";
      default:
        return "transparent";
    }
  };

  const getEntryLabel = (index: number, label: string) => {
    switch (true) {
      case values.length < 14:
      case index === 0 || index === values.length - 1:
        return label;
      default:
        return null;
    }
  };

  return (
    <View className="aspect-video border border-foreground">
      <Svg
        height="100%"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        width="100%"
      >
        <Rect fill="#f7fff7" height="100%" id="bg" width="100%" x={0} y={0} />

        <Polyline
          fill="none"
          points={pointCoordinates.map(({ x, y }) => `${x} ${y}`).join(", ")}
          stroke="#4a4a4a"
          strokeWidth={6}
        />

        {Object.entries(props.values).map(([k, v], i) => {
          return (
            <Fragment key={k}>
              <Line
                stroke={getEntryStrokeColor(i)}
                strokeDasharray={10}
                strokeWidth={4}
                x1={pointCoordinates[i].x}
                x2={pointCoordinates[i].x}
                y1={150}
                y2={VIEWBOX_HEIGHT - 150}
              />

              <Circle
                cx={pointCoordinates[i].x}
                cy={pointCoordinates[i].y}
                fill="#4a4a4a"
                r={20}
              />

              <SVGText
                fill="#1c1c1e"
                fontFamily="SpaceGrotesk-Regular"
                fontSize={50}
                textAnchor="middle"
                x={pointCoordinates[i].x}
                y={100}
              >
                {getEntryLabel(i, formatNumber(v))}
              </SVGText>

              <SVGText
                fill="#1c1c1e"
                fontFamily="SpaceGrotesk-Regular"
                fontSize={50}
                textAnchor="middle"
                x={pointCoordinates[i].x}
                y={VIEWBOX_HEIGHT - 60}
              >
                {getEntryLabel(i, toDateAndMonthString(k))}
              </SVGText>
            </Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

import { Fragment } from "react";
import { View } from "react-native";
import Svg, {
  Circle,
  Line,
  Polyline,
  Rect,
  Text as SVGText,
} from "react-native-svg";
import { formatNumber } from "@/src/utils/number";

const VIEWBOX_HEIGHT = 900,
  VIEWBOX_WIDTH = 1600;

interface Props {
  values: Record<string, number>;
}

export const LineChart = (props: Props) => {
  const values = Object.values(props.values);

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const heightPad = (maxValue - minValue) / 2;
  const widthSafeAreaOffset = values.length === 1 ? VIEWBOX_WIDTH / 2 : 100;

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
          points={values
            .map(
              (v, i) =>
                `${widthSafeAreaOffset + i * ((VIEWBOX_WIDTH - widthSafeAreaOffset * 2) / Math.max(values.length - 1, 1))} ${
                  (1 -
                    (v - (minValue - heightPad)) /
                      (maxValue + heightPad - (minValue - heightPad))) *
                  (VIEWBOX_HEIGHT - heightPad * 2)
                }`,
            )
            .join(", ")}
          stroke="#4a4a4a"
          strokeWidth={6}
        />

        {Object.entries(props.values).map(([k, v], i, self) => {
          const pointX =
            widthSafeAreaOffset +
            i *
              ((VIEWBOX_WIDTH - widthSafeAreaOffset * 2) /
                (self.length - 1 || 1));
          const pointY =
            (1 -
              (v - (minValue - heightPad)) /
                (maxValue + heightPad - (minValue - heightPad))) *
            (VIEWBOX_HEIGHT - heightPad * 2);

          return (
            <Fragment key={k}>
              <Circle cx={pointX} cy={pointY} fill="#4a4a4a" r={20} />

              <SVGText
                fill="#1c1c1e"
                fontFamily="SpaceGrotesk-Regular"
                fontSize={50}
                textAnchor="middle"
                x={pointX}
                y={100}
              >
                {formatNumber(v)}
              </SVGText>

              <Line
                stroke="#4a4a4a"
                strokeDasharray={10}
                strokeWidth={5}
                x1={pointX}
                x2={pointX}
                y1={150}
                y2={VIEWBOX_HEIGHT - 150}
              />

              <SVGText
                fill="#1c1c1e"
                fontFamily="SpaceGrotesk-Regular"
                fontSize={50}
                textAnchor="middle"
                x={pointX}
                y={VIEWBOX_HEIGHT - 60}
              >
                {new Date(k).toLocaleDateString("fi", {
                  day: "numeric",
                  month: "numeric",
                })}
              </SVGText>
            </Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

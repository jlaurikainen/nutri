import { Fragment } from "react";
import { View } from "react-native";
import Svg, { Line, Rect, Text as SVGText } from "react-native-svg";

const VIEW_BOX_HEIGHT = 900,
  VIEW_BOX_WIDTH = 1600;

interface Props<T> {
  comparisonValue?: number;
  getBarKey: (x: T) => string;
  getBarLabel: (x: T) => string;
  getBarValue: (x: T) => number;
  values: Array<T>;
}

export const BarChart = <T,>(props: Props<T>) => {
  const barWidth = VIEW_BOX_WIDTH / props.values.length;
  const barWidthGap = barWidth * 0.4;
  const fontSize = VIEW_BOX_HEIGHT / 16;
  const maxValue = Math.max(
    ...props.values.map(props.getBarValue),
    props.comparisonValue ?? 0,
  );
  const maxValueAdjusted = maxValue + maxValue / 5;
  const relativeViewBoxUnit = VIEW_BOX_HEIGHT / maxValueAdjusted;

  return (
    <View className="aspect-video border border-foreground">
      <Svg
        height="100%"
        viewBox={`0 -${VIEW_BOX_HEIGHT} ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`}
        width="100%"
      >
        <Rect fill="#f7fff7" height="100%" id="bg" width="100%" x={0} y={0} />

        {props.comparisonValue ? (
          <Line
            stroke="#4a4a4a"
            strokeDasharray={10}
            strokeWidth={4}
            x1={0}
            x2="100%"
            y1={-relativeViewBoxUnit * props.comparisonValue}
            y2={-relativeViewBoxUnit * props.comparisonValue}
          />
        ) : null}

        {props.values.map((x, i) => {
          const barValue = props.getBarValue(x);
          const barLabel = props.getBarLabel(x);

          return (
            <Fragment key={props.getBarKey(x)}>
              <SVGText
                fill="#1c1c1e"
                fontFamily="SpaceGrotesk-Regular"
                fontSize={fontSize}
                textAnchor="middle"
                x={i * barWidth + barWidth / 2}
                y={-relativeViewBoxUnit * barValue - fontSize / 2}
              >
                {barLabel}
              </SVGText>

              <Rect
                fill="#4a4a4a"
                height={relativeViewBoxUnit * barValue}
                width={barWidth - barWidthGap}
                x={barWidthGap / 2 + i * barWidth}
                y={-relativeViewBoxUnit * barValue}
              />
            </Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

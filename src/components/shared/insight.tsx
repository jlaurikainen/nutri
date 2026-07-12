import { View } from "react-native";
import { formatNumber } from "@/src/utils/number";
import { cn } from "@/src/utils/utils";
import { Text } from "./text";

interface Props {
  amount: number;
  ratio?: number;
  title: string;
  unit: string;
  withinRecommendations?: boolean;
}

export const Insight = (props: Props) => {
  return (
    <View className="flex flex-1 border border-foreground p-2">
      <Text
        className={cn(
          "text-2xl",
          props.withinRecommendations === undefined
            ? "text-foreground"
            : props.withinRecommendations
              ? "text-success"
              : "text-brand",
        )}
      >
        {formatNumber(props.amount)}
      </Text>
      <View className="flex-row items-end">
        <Text className="text-mid-gray">
          {props.title} | {props.unit}
        </Text>
        {props.ratio ? (
          <Text className="ml-auto text-light-gray text-sm">
            {formatNumber(props.ratio * 100, 0)}%
          </Text>
        ) : null}
      </View>
    </View>
  );
};

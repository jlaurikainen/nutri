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
  const getWithinRecommendationColor = () => {
    switch (true) {
      case props.withinRecommendations === true:
        return "text-success";
      case props.withinRecommendations === false:
        return "text-brand";
      default:
        return "text-foreground";
    }
  };

  return (
    <View className="flex flex-1 border border-foreground p-2">
      <Text className={cn("text-xl", getWithinRecommendationColor())}>
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

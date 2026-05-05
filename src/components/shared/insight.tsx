import { View } from "react-native";
import { formatNumber } from "@/src/utils/number";
import { Text } from "./text";

interface Props {
  amount: number;
  ratio?: number;
  title: string;
  unit: string;
}

export const Insight = (props: Props) => {
  return (
    <View className="flex flex-1 border border-foreground p-4">
      <Text className="text-4xl text-foreground">
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

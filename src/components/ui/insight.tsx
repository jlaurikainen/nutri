import { View } from "react-native";
import { formatNumber } from "@/src/lib/number";
import { Text } from "./text";

interface Props {
  amount: number;
  title: string;
  unit: string;
}

export const Insight = (props: Props) => {
  return (
    <View className="flex flex-1 border p-4 border-foreground">
      <Text className="text-4xl text-foreground">
        {formatNumber(props.amount)}
        <Text className="text-xl text-mid-gray">{props.unit}</Text>
      </Text>
      <Text className="text-mid-gray">{props.title}</Text>
    </View>
  );
};

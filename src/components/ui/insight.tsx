import { View } from "react-native";
import { Text } from "./text";

interface Props {
  amount: number;
  title: string;
  unit: string;
}

export const Insight = (props: Props) => {
  return (
    <View className="flex flex-1 border p-4 border-gray-900">
      <Text className="text-4xl text-gray-900">
        {props.amount.toLocaleString("fi", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        })}{" "}
        <Text className="text-xl text-gray-700">{props.unit}</Text>
      </Text>
      <Text className="text-gray-700">{props.title}</Text>
    </View>
  );
};

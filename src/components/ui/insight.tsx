import { View } from "react-native";
import { Text } from "./text";

interface Props {
  amount: number;
  title: string;
  unit: string;
}

export const Insight = (props: Props) => {
  return (
    <View className="flex rounded-xl flex-1 border p-4 border-gray-500">
      <Text className="text-4xl text-gray-700">
        {props.amount.toLocaleString("fi", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        })}{" "}
        <Text className="text-xl text-gray-500">{props.unit}</Text>
      </Text>
      <Text className="text-gray-500">{props.title}</Text>
    </View>
  );
};

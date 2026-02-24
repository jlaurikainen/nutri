import { View } from "react-native";
import { Text } from "./text";

interface Props {
  amount: number;
  title: string;
}

export const Insight = (props: Props) => {
  return (
    <View className="flex rounded-xl flex-1">
      <Text className="text-4xl text-gray-700">{props.amount}</Text>
      <Text className="text-gray-400">{props.title}</Text>
    </View>
  );
};

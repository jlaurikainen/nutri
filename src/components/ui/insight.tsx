import { View } from "react-native";
import { Text } from "./text";

interface Props {
  amount: number;
  title: string;
}

export const Insight = (props: Props) => {
  return (
    <View className="flex gap-2 p-4 bg-white/10 rounded-2xl">
      <Text className="text-4xl">{props.amount}</Text>
      <Text className="text-gray-400">{props.title}</Text>
    </View>
  );
};

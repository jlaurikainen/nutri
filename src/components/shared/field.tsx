import { View } from "react-native";
import { Input, type InputProps } from "./input";
import { Text } from "./text";

interface Props extends InputProps {
  label: string;
}

export const Field = (props: Props) => {
  const { label, ...rest } = props;

  return (
    <View className="gap-1">
      <Text className="ml-1">{label}</Text>

      <Input {...rest} />
    </View>
  );
};

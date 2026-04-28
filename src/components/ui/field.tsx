import type { ComponentProps } from "react";
import { View } from "react-native";
import { Input } from "./input";
import { Text } from "./text";

interface Props extends ComponentProps<typeof Input> {
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

import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { Text } from "./text";

export const List = (props: PropsWithChildren) => {
  return <View className="mb-4 gap-1" {...props} />;
};

const ListHeading = (props: PropsWithChildren) => {
  return <Text className="text-xl" {...props} />;
};

const ListItem = (props: PropsWithChildren) => {
  return (
    <View
      className="flex-row justify-between border-light-gray border-b"
      {...props}
    />
  );
};

List.Heading = ListHeading;
List.Item = ListItem;

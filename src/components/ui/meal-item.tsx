import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { Text } from "./text";

export const MealItem = (props: PropsWithChildren) => {
  return (
    <View className="gap-1 p-4 border-gray-900 border">{props.children}</View>
  );
};

const Title = (props: { title: string }) => {
  return <Text className="text-gray-900 text-xl">{props.title}</Text>;
};

const Macros = (props: PropsWithChildren) => {
  return (
    <View className="flex-row justify-between gap-1">{props.children}</View>
  );
};

const Macro = (props: { label: string; unit: string; value: number }) => {
  return (
    <View>
      <Text className="text-gray-700 text-xs">{props.label}</Text>
      <Text className="text-gray-700">{`${props.value} ${props.unit}`}</Text>
    </View>
  );
};

const Actions = (props: PropsWithChildren) => {
  return <View className="flex-row gap-1 mt-2">{props.children}</View>;
};

MealItem.Title = Title;
MealItem.Macros = Macros;
MealItem.Macro = Macro;
MealItem.Actions = Actions;

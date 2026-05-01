import type { PropsWithChildren, ReactNode } from "react";
import { View } from "react-native";
import { formatNumber } from "@/src/lib/number";
import { Text } from "./text";

export const MealItem = (props: PropsWithChildren) => {
  return (
    <View className="gap-1 px-3 py-2 border-gray-900 border">
      {props.children}
    </View>
  );
};

const Heading = (props: PropsWithChildren<{ action?: ReactNode }>) => {
  return (
    <View className="flex-row gap-2 items-center">
      {props.children}
      {props.action ? <View className="ml-auto">{props.action}</View> : null}
    </View>
  );
};

const Title = (props: { title: string }) => {
  return (
    <Text className="text-foreground text-xl line-clamp-1 shrink">
      {props.title}
    </Text>
  );
};

const Macros = (props: PropsWithChildren) => {
  return <View className="flex-row gap-1">{props.children}</View>;
};

const Macro = (props: { label: string; unit: string; value: number }) => {
  return (
    <View className="flex-1">
      <Text className="text-light-gray text-xs">{props.label}</Text>
      <Text className="text-mid-gray">{`${formatNumber(props.value)} ${props.unit}`}</Text>
    </View>
  );
};

const Actions = (props: PropsWithChildren) => {
  return <View className="flex-row gap-1 mt-2">{props.children}</View>;
};

MealItem.Heading = Heading;
MealItem.Title = Title;
MealItem.Macros = Macros;
MealItem.Macro = Macro;
MealItem.Actions = Actions;

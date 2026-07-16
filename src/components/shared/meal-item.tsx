import type { PropsWithChildren, ReactNode } from "react";
import { View } from "react-native";
import { formatNumber } from "@/src/utils/number";
import { Text } from "./text";

export const MealItem = (props: PropsWithChildren) => {
  return (
    <View className="gap-1 border border-gray-900 px-3 py-2">
      {props.children}
    </View>
  );
};

const Heading = (props: PropsWithChildren<{ action?: ReactNode }>) => {
  return (
    <View className="flex-row items-center gap-2">
      {props.children}
      {props.action ? <View className="ml-auto">{props.action}</View> : null}
    </View>
  );
};

const Title = (props: { title: string }) => {
  return (
    <Text className="line-clamp-1 shrink text-foreground text-xl">
      {props.title}
    </Text>
  );
};

const Macros = (props: PropsWithChildren) => {
  return (
    <View className="flex-row flex-wrap justify-between gap-1">
      {props.children}
    </View>
  );
};

const Macro = (props: { label: string; unit?: string; value: number }) => {
  return (
    <View className="w-3/10">
      <Text className="text-light-gray text-xs">{props.label}</Text>
      <Text className="text-mid-gray text-sm">{`${formatNumber(props.value)}${props.unit ?? ""}`}</Text>
    </View>
  );
};

const Actions = (props: PropsWithChildren) => {
  return <View className="mt-2 flex-row gap-1">{props.children}</View>;
};

MealItem.Heading = Heading;
MealItem.Title = Title;
MealItem.Macros = Macros;
MealItem.Macro = Macro;
MealItem.Actions = Actions;

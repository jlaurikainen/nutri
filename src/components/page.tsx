import type { PropsWithChildren } from "react";
import { View } from "react-native";

export const Page = (props: PropsWithChildren) => {
  return <View className="flex-1 bg-neutral-100 gap-4 p-4" {...props} />;
};

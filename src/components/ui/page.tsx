import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Page = (props: PropsWithChildren) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 bg-neutral-100 gap-4 p-4"
      style={{ paddingTop: insets.top + 8 }}
      {...props}
    />
  );
};

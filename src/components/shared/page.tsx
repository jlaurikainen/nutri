import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Page = (props: PropsWithChildren) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 gap-4 bg-background p-4"
      style={{ paddingBottom: insets.bottom + 16 }}
      {...props}
    />
  );
};

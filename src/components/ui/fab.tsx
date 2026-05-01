import type { LucideIcon } from "lucide-react-native";
import { Pressable, type PressableProps, View } from "react-native";
import { cn } from "@/src/utils/utils";
import { Icon } from "./icon";

interface Props extends PressableProps {
  icon: LucideIcon;
}

export function FAB(props: Props) {
  const { icon, ...rest } = props;

  return (
    <Pressable
      {...rest}
      className={cn(
        "absolute bg-brand active:bg-brand/90 rounded-full",
        rest.className,
      )}
    >
      <View className="items-center justify-center p-3 ">
        <Icon as={icon} className="text-background" size={32} />
      </View>
    </Pressable>
  );
}

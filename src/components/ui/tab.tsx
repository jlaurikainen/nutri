import { Link, type LinkProps, usePathname } from "expo-router";
import type { LucideIcon } from "lucide-react-native";
import { View } from "react-native";
import { Button } from "./button";
import { Icon } from "./icon";
import { Text } from "./text";

interface Props {
  href: LinkProps["href"];
  icon: LucideIcon;
  label: string;
}

export const Tab = (props: Props) => {
  const { href, icon: TabIcon, label } = props;
  const pathname = usePathname();

  return (
    <View className="items-center gap-2">
      <Link asChild href={href}>
        <Button
          className="h-12 w-12"
          size="icon"
          variant={pathname === href ? "default" : "secondary"}
        >
          <Icon as={TabIcon} color={pathname === href ? "white" : "black"} />
        </Button>
      </Link>
      <Text>{label}</Text>
    </View>
  );
};

import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Link, Stack } from "expo-router";
import { HomeIcon, LibraryIcon, User2Icon } from "lucide-react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Contexts } from "../components/contexts";
import { Button } from "../components/ui/button";
import { Icon } from "../components/ui/icon";

const RootLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Contexts>
      <Stack screenOptions={{ headerShown: false }} />
      <View
        className="flex-row justify-center gap-4 items-center bg-gray-900 pt-2"
        style={{ paddingBottom: insets.bottom }}
      >
        <Link asChild href="/">
          <Button className="h-12 w-12" size="icon" variant="secondary">
            <Icon as={HomeIcon} />
          </Button>
        </Link>
        <Link asChild href="/meal-templates">
          <Button className="h-12 w-12" size="icon" variant="secondary">
            <Icon as={LibraryIcon} />
          </Button>
        </Link>
        <Link asChild href="/user">
          <Button className="h-12 w-12" size="icon" variant="secondary">
            <Icon as={User2Icon} />
          </Button>
        </Link>
      </View>
      <PortalHost />
    </Contexts>
  );
};

export default RootLayout;

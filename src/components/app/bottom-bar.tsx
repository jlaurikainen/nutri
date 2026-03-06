import { HomeIcon, LibraryIcon, User2Icon } from "lucide-react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tab } from "../ui/tab";

export const BottomBar = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row justify-evenly gap-4 items-center bg-white pt-4 border-t border-t-gray-200"
      style={{ paddingBottom: insets.bottom }}
    >
      <Tab href="/" icon={HomeIcon} label="Home" />
      <Tab href="/meal-templates" icon={LibraryIcon} label="Templates" />
      <Tab href="/user" icon={User2Icon} label="User" />
    </View>
  );
};

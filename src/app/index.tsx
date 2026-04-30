import { Link, Stack } from "expo-router";
import { Plus } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DailyMacros } from "../components/home/daily-macros";
import { WeeklyCalories } from "../components/home/weekly-calories";
import { FAB } from "../components/ui/fab";
import { Page } from "../components/ui/page";

const Home = () => {
  const insets = useSafeAreaInsets();

  return (
    <Page>
      <Stack.Screen options={{ title: "Home" }} />
      <DailyMacros />
      <WeeklyCalories />
      <Link asChild href="/meal-templates">
        <FAB icon={Plus} style={{ bottom: insets.bottom + 16, left: 16 }} />
      </Link>
    </Page>
  );
};

export default Home;

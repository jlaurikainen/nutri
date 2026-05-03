import { Link, Stack } from "expo-router";
import { Plus, User } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DailyMacros } from "../components/home/daily-macros";
import { WeeklyCalories } from "../components/home/weekly-calories";
import { Button } from "../components/shared/button";
import { FAB } from "../components/shared/fab";
import { Icon } from "../components/shared/icon";
import { Page } from "../components/shared/page";

const Home = () => {
  const insets = useSafeAreaInsets();

  return (
    <Page>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link asChild href="/user">
              <Button className="rounded-full" size="icon" variant="secondary">
                <Icon as={User} />
              </Button>
            </Link>
          ),
          title: "Home",
        }}
      />
      <DailyMacros />
      <WeeklyCalories />
      <Link asChild href="/meal-templates">
        <FAB icon={Plus} style={{ bottom: insets.bottom + 16, left: 16 }} />
      </Link>
    </Page>
  );
};

export default Home;

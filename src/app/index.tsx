import { Link, Stack } from "expo-router";
import { User } from "lucide-react-native";
import { Fragment } from "react";
import { ScrollView, View } from "react-native";
import { DailyMacros } from "../components/home/daily-macros";
import { WeeklyCalories } from "../components/home/weekly-calories";
import { WeightData } from "../components/home/weight-data";
import { Button } from "../components/shared/button";
import { Icon } from "../components/shared/icon";
import { Page } from "../components/shared/page";

const Home = () => {
  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link asChild href="/user">
              <Button className="rounded-full" size="icon" variant="bordered">
                <Icon as={User} />
              </Button>
            </Link>
          ),
          title: "Home",
        }}
      />
      <Page>
        <ScrollView>
          <View className="gap-4">
            <DailyMacros />
            <WeeklyCalories />
            <WeightData />
          </View>
        </ScrollView>
      </Page>
    </Fragment>
  );
};

export default Home;

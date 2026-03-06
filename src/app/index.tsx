import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScrollView } from "react-native";
import { DailyMacros } from "../components/home/daily-macros";
import { DailyMeals } from "../components/home/daily-meals";
import { Page } from "../components/ui/page";

const Home = () => {
  return (
    <Fragment>
      <Stack.Screen options={{ title: "Home" }} />

      <Page>
        <DailyMacros />

        <ScrollView className="flex-1">
          <DailyMeals />
        </ScrollView>
      </Page>
    </Fragment>
  );
};

export default Home;

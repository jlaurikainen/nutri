import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScrollView } from "react-native";
import { DailyMacros } from "../components/daily-macros";
import { DailyMeals } from "../components/daily-meals";
import { Page } from "../components/page";

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

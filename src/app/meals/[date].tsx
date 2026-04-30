import { Stack } from "expo-router";
import { Fragment } from "react";
import { DailyMeals } from "@/src/components/home/daily-meals";
import { Page } from "@/src/components/ui/page";
import { useParsedLocalParams } from "@/src/hooks/useParsedLocalParams";
import { pathDateSchema } from "@/src/schemas/search-params";

function Meals() {
  const { date } = useParsedLocalParams(pathDateSchema);

  return (
    <Fragment>
      <Stack.Screen options={{ title: "Meals" }} />
      <Page>
        <DailyMeals date={new Date(date)} />
      </Page>
    </Fragment>
  );
}

export default Meals;

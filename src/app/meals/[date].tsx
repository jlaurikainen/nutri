import { Stack, useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { Fragment } from "react";
import { View } from "react-native";
import { DailyMeals } from "@/src/components/meals/daily-meals";
import { Button } from "@/src/components/shared/button";
import { Icon } from "@/src/components/shared/icon";
import { Page } from "@/src/components/shared/page";
import { Text } from "@/src/components/shared/text";
import { useParsedLocalParams } from "@/src/hooks/useParsedLocalParams";
import {
  addDays,
  startOfDay,
  toTimezoneAwareISOString,
} from "@/src/utils/date";
import { pathDateSchema } from "@/src/utils/search-params";

function Meals() {
  const { date } = useParsedLocalParams(pathDateSchema);
  const router = useRouter();

  const isTodayOrFuture = startOfDay(date) >= startOfDay(new Date());

  const goBack = () => {
    return () => {
      router.replace({
        params: { date: toTimezoneAwareISOString(addDays(date, -1)) },
        pathname: "/meals/[date]",
      });
    };
  };

  const goForward = () => {
    return () => {
      router.replace({
        params: { date: toTimezoneAwareISOString(addDays(date, 1)) },
        pathname: "/meals/[date]",
      });
    };
  };

  return (
    <Fragment>
      <Stack.Screen options={{ title: "Meals" }} />
      <Page>
        <View className="flex-row gap-4 items-center justify-between">
          <Button onPress={goBack()} size="icon" variant="bordered">
            <Icon as={ArrowLeft} />
          </Button>
          <Text className="text-center">{date.toLocaleDateString("fi")}</Text>
          <Button
            disabled={isTodayOrFuture}
            onPress={goForward()}
            size="icon"
            variant="bordered"
          >
            <Icon as={ArrowRight} />
          </Button>
        </View>
        <DailyMeals date={date} />
      </Page>
    </Fragment>
  );
}

export default Meals;

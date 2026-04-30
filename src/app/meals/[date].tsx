import { Stack, useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { Fragment } from "react";
import { View } from "react-native";
import { DailyMeals } from "@/src/components/meals/daily-meals";
import { Button } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { Page } from "@/src/components/ui/page";
import { Text } from "@/src/components/ui/text";
import { useParsedLocalParams } from "@/src/hooks/useParsedLocalParams";
import { addDays, startOfDay, toDateOnlyTZISO } from "@/src/lib/date";
import { pathDateSchema } from "@/src/schemas/search-params";

function Meals() {
  const { date } = useParsedLocalParams(pathDateSchema);
  const router = useRouter();

  const isTodayOrFuture = startOfDay(new Date(date)) >= startOfDay(new Date());

  const goBack = () => {
    return () => {
      router.replace({
        params: { date: toDateOnlyTZISO(addDays(new Date(date), -1)) },
        pathname: "/meals/[date]",
      });
    };
  };

  const goForward = () => {
    return () => {
      router.replace({
        params: { date: toDateOnlyTZISO(addDays(new Date(date), 1)) },
        pathname: "/meals/[date]",
      });
    };
  };

  return (
    <Fragment>
      <Stack.Screen options={{ title: "Meals" }} />
      <Page>
        <View className="flex-row gap-4 items-center justify-between">
          <Button onPress={goBack()} size="icon" variant="secondary">
            <Icon as={ArrowLeft} />
          </Button>
          <Text className="text-center">
            {new Date(date).toLocaleDateString("fi")}
          </Text>
          <Button
            disabled={isTodayOrFuture}
            onPress={goForward()}
            size="icon"
            variant="secondary"
          >
            <Icon as={ArrowRight} />
          </Button>
        </View>
        <DailyMeals date={new Date(date)} />
      </Page>
    </Fragment>
  );
}

export default Meals;

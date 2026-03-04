import { Link, Stack } from "expo-router";
import { Trash2 } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { Page } from "../components/page";
import { Button } from "../components/ui/button";
import { Icon } from "../components/ui/icon";
import { Insight } from "../components/ui/insight";
import { MealItem } from "../components/ui/meal-item";
import { Text } from "../components/ui/text";
import { useDeleteMeal, useMeals } from "../queries/meals";

const Home = () => {
  const { data = [] } = useMeals({ end: new Date(), start: new Date() });
  const { mutateAsync } = useDeleteMeal();

  const totals = data.reduce(
    (a, c) => {
      a.calories += c.calories;
      a.carbs += c.carbs;
      a.fat += c.fat;
      a.protein += c.protein;

      return a;
    },
    {
      calories: 0,
      carbs: 0,
      fat: 0,
      protein: 0,
    },
  );

  const onDelete = (id: number) => {
    return async () => {
      await mutateAsync(id);
    };
  };

  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />

      <Page>
        <View className="gap-2 flex-row w-full">
          <Insight amount={totals.calories} title="Calories" unit="kcal" />
          <Insight amount={totals.carbs} title="Carbs" unit="g" />
        </View>

        <View className="gap-2 flex-row w-full">
          <Insight amount={totals.protein} title="Protein" unit="g" />
          <Insight amount={totals.fat} title="Fat" unit="g" />
        </View>

        <View>
          <Link asChild href="/meal-templates">
            <Button>
              <Text>Meal Templates</Text>
            </Button>
          </Link>
        </View>

        <ScrollView className="flex-1">
          <View>
            {data?.map((x) => (
              <MealItem key={x.id}>
                <MealItem.Title title={x.name} />
                <MealItem.Macros>
                  <MealItem.Macro
                    label="calories"
                    unit="kcal"
                    value={x.calories}
                  />
                  <MealItem.Macro label="carbs" unit="g" value={x.carbs} />
                  <MealItem.Macro label="protein" unit="g" value={x.protein} />
                  <MealItem.Macro label="fat" unit="g" value={x.fat} />
                </MealItem.Macros>
                <MealItem.Actions>
                  <View className="ml-auto">
                    <Button
                      onPress={onDelete(x.id)}
                      size="icon"
                      variant="secondary"
                    >
                      <Icon as={Trash2} />
                    </Button>
                  </View>
                </MealItem.Actions>
              </MealItem>
            ))}
          </View>
        </ScrollView>
      </Page>
    </>
  );
};

export default Home;

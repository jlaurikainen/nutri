import { Link } from "expo-router";
import { Trash2 } from "lucide-react-native";
import { Fragment } from "react";
import { ScrollView, View } from "react-native";
import { useDeleteMeal, useMeals } from "@/src/queries/meals";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { MealItem } from "../ui/meal-item";
import { Text } from "../ui/text";

export const DailyMeals = () => {
  const { data = [] } = useMeals({ end: new Date(), start: new Date() });
  const { mutateAsync } = useDeleteMeal();

  const onDelete = (id: number) => {
    return async () => {
      await mutateAsync(id);
    };
  };

  if (data.length === 0) {
    return (
      <View className="items-center my-24 gap-8">
        <Text className="text-gray-900" variant="h3">
          No Meals Added for Today
        </Text>
        <Link asChild href="/meal-templates">
          <Button>
            <Text>Add Meal</Text>
          </Button>
        </Link>
      </View>
    );
  }

  return (
    <Fragment>
      <Link asChild href="/meal-templates">
        <Button>
          <Text>Add Meal</Text>
        </Button>
      </Link>

      <ScrollView className="flex-1">
        <View className="gap-2">
          {data.map((x) => (
            <MealItem key={x.id}>
              <MealItem.Heading
                action={
                  <Button
                    onPress={onDelete(x.id)}
                    size="icon"
                    variant="secondary"
                  >
                    <Icon as={Trash2} />
                  </Button>
                }
              >
                <MealItem.Title title={x.name} />
              </MealItem.Heading>
            </MealItem>
          ))}
        </View>
      </ScrollView>
    </Fragment>
  );
};

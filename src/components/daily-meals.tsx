import { Link } from "expo-router";
import { Trash2 } from "lucide-react-native";
import { View } from "react-native";
import { useDeleteMeal, useMeals } from "../queries/meals";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";
import { MealItem } from "./ui/meal-item";
import { Text } from "./ui/text";

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
        <Text className="text-gray-500" variant="h3">
          No Meals Added for Today
        </Text>
        <Link asChild href="/meal-templates">
          <Button>
            <Text>Add Meals</Text>
          </Button>
        </Link>
      </View>
    );
  }

  return data?.map((x) => (
    <MealItem key={x.id}>
      <MealItem.Title title={x.name} />
      <MealItem.Macros>
        <MealItem.Macro label="calories" unit="kcal" value={x.calories} />
        <MealItem.Macro label="carbs" unit="g" value={x.carbs} />
        <MealItem.Macro label="protein" unit="g" value={x.protein} />
        <MealItem.Macro label="fat" unit="g" value={x.fat} />
      </MealItem.Macros>
      <MealItem.Actions>
        <View className="ml-auto">
          <Button onPress={onDelete(x.id)} size="icon" variant="secondary">
            <Icon as={Trash2} />
          </Button>
        </View>
      </MealItem.Actions>
    </MealItem>
  ));
};

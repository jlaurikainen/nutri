import { Alert, Pressable, ScrollView, View } from "react-native";
import { useDeleteMeal, useMeals } from "@/src/queries/meals";
import { reduceToDailyMacros } from "@/src/utils/macros";
import { MealItem } from "../shared/meal-item";
import { Text } from "../shared/text";
import { MacroListing } from "./macro-listing";

interface Props {
  date: Date;
}

export const DailyMeals = (props: Props) => {
  const { data = [] } = useMeals({
    end: props.date ?? new Date(),
    start: props.date ?? new Date(),
  });
  const macros = reduceToDailyMacros(data);
  const { mutate } = useDeleteMeal();

  const onDelete = (id: number) => {
    Alert.alert("Delete Meal", "Are you sure you want to delete this meal?", [
      {
        text: "Cancel",
      },
      {
        onPress: () => mutate(id),
        text: "Delete",
      },
    ]);
  };

  if (data.length === 0) {
    return (
      <View className="aspect-video items-center justify-center">
        <Text className="text-lg">No Meals Added for This Day</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="gap-2">
        <MacroListing {...macros} />

        {data.map((x) => (
          <Pressable key={x.id} onLongPress={() => onDelete(x.id)}>
            <MealItem>
              <MealItem.Heading>
                <MealItem.Title title={x.name} />
              </MealItem.Heading>
              <MealItem.Macros>
                <MealItem.Macro label="calories" value={x.calories} />
                <MealItem.Macro label="carbs" unit="g" value={x.carbs} />
                <MealItem.Macro label="sugar" unit="g" value={x.sugar} />
                <MealItem.Macro label="fat" unit="g" value={x.fat} />
                <MealItem.Macro label="protein" unit="g" value={x.protein} />
                <MealItem.Macro label="fiber" unit="g" value={x.fiber} />
              </MealItem.Macros>
            </MealItem>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

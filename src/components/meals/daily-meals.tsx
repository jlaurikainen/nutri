import { Pressable, ScrollView, View } from "react-native";
import { useDeleteMeal, useMeals } from "@/src/queries/meals";
import { reduceToDailyMacros } from "@/src/utils/macros";
import { MealItem } from "../shared/meal-item";
import { Text } from "../shared/text";

interface Props {
  date?: Date;
}

export const DailyMeals = (props: Props) => {
  const { mutate } = useDeleteMeal();
  const { data = [] } = useMeals({
    end: props.date ?? new Date(),
    start: props.date ?? new Date(),
  });

  const macros = reduceToDailyMacros(data);

  const onDelete = (id: number) => {
    return () => {
      mutate(id);
    };
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
        <View className="mb-4 gap-1">
          <Text className="text-xl">Total Macros</Text>
          <View className="flex-row justify-between border-light-gray border-b">
            <Text>Calories:</Text>
            <Text>{macros.calories}kcal</Text>
          </View>
          <View className="flex-row justify-between border-light-gray border-b">
            <Text>Carbs:</Text>
            <Text>{macros.carbs}g</Text>
          </View>
          <View className="flex-row justify-between border-light-gray border-b">
            <Text>Sugar:</Text>
            <Text>{macros.sugar}g</Text>
          </View>
          <View className="flex-row justify-between border-light-gray border-b">
            <Text>Fat:</Text>
            <Text>{macros.fat}g</Text>
          </View>
          <View className="flex-row justify-between border-light-gray border-b">
            <Text>Protein:</Text>
            <Text>{macros.protein}g</Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Fiber:</Text>
            <Text>{macros.fiber}g</Text>
          </View>
        </View>

        {data.map((x) => (
          <Pressable key={x.id} onLongPress={onDelete(x.id)}>
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

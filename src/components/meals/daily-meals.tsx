import { Trash2 } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { useDeleteMeal, useMeals } from "@/src/queries/meals";
import { Button } from "../shared/button";
import { Icon } from "../shared/icon";
import { MealItem } from "../shared/meal-item";
import { Text } from "../shared/text";

interface Props {
  date?: Date;
}

export const DailyMeals = (props: Props) => {
  const { mutateAsync } = useDeleteMeal();
  const { data = [] } = useMeals({
    end: props.date ?? new Date(),
    start: props.date ?? new Date(),
  });

  const onDelete = (id: number) => {
    return async () => {
      await mutateAsync(id);
    };
  };

  if (data.length === 0) {
    return (
      <View className="items-center justify-center aspect-video">
        <Text className="text-lg">No Meals Added for This Day</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View className="gap-2">
        {data.map((x) => (
          <MealItem key={x.id}>
            <MealItem.Heading
              action={
                <Button onPress={onDelete(x.id)} size="icon" variant="bordered">
                  <Icon as={Trash2} />
                </Button>
              }
            >
              <MealItem.Title title={x.name} />
            </MealItem.Heading>
            <MealItem.Macros>
              <MealItem.Macro label="Calories" unit="kcal" value={x.calories} />
              <MealItem.Macro label="Carbs" unit="g" value={x.carbs} />
              <MealItem.Macro label="Protein" unit="g" value={x.protein} />
              <MealItem.Macro label="Fat" unit="g" value={x.fat} />
            </MealItem.Macros>
          </MealItem>
        ))}
      </View>
    </ScrollView>
  );
};

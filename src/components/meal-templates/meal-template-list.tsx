import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import type z from "zod";
import { toTimezoneAwareISOString } from "@/src/lib/date";
import type { mealTemplateSchema } from "@/src/queries/meal-templates";
import { useAddMeal } from "@/src/queries/meals";
import { MealItem } from "../ui/meal-item";
import { useFilteredMealTempaltes } from "./useFilteredMealTemplates";

export const MealTemplateList = () => {
  const data = useFilteredMealTempaltes();
  const router = useRouter();
  const { mutateAsync } = useAddMeal();

  const onAdd = (template: z.infer<typeof mealTemplateSchema>) => {
    return async () => {
      await mutateAsync({
        ...template,
        date: toTimezoneAwareISOString(new Date()),
      }).then(() => router.back());
    };
  };

  const onEdit = (id: number) => {
    return () => {
      router.navigate(`/meal-templates/${id}`);
    };
  };

  return (
    <ScrollView>
      <View className="gap-4">
        {data.map((x) => (
          <Pressable key={x.id} onLongPress={onEdit(x.id)} onPress={onAdd(x)}>
            <MealItem>
              <MealItem.Heading>
                <MealItem.Title title={x.name} />
              </MealItem.Heading>

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
            </MealItem>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

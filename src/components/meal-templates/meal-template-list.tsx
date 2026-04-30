import { Link, useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import type z from "zod";
import type { mealTemplateSchema } from "@/src/queries/meal-templates";
import { useAddMeal } from "@/src/queries/meals";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { MealItem } from "../ui/meal-item";
import { useFilteredMealTempaltes } from "./useFilteredMealTemplates";

export const MealTemplateList = () => {
  const router = useRouter();
  const data = useFilteredMealTempaltes();
  const { mutateAsync: addMeal } = useAddMeal();

  const onAdd = (template: z.infer<typeof mealTemplateSchema>) => {
    return async () => {
      await addMeal({ ...template, date: new Date() });
      router.back();
    };
  };

  return (
    <ScrollView>
      <View className="gap-4">
        {data.map((x) => (
          <MealItem key={x.id}>
            <MealItem.Heading
              action={
                <Button onPress={onAdd(x)} size="icon" variant="secondary">
                  <Icon as={Plus} />
                </Button>
              }
            >
              <Link
                className="text-xl line-clamp-1 text-indigo-900 shrink"
                href={`/meal-templates/${x.id}`}
              >
                {x.name}
              </Link>
            </MealItem.Heading>

            <MealItem.Macros>
              <MealItem.Macro label="calories" unit="kcal" value={x.calories} />
              <MealItem.Macro label="carbs" unit="g" value={x.carbs} />
              <MealItem.Macro label="protein" unit="g" value={x.protein} />
              <MealItem.Macro label="fat" unit="g" value={x.fat} />
            </MealItem.Macros>
          </MealItem>
        ))}
      </View>
    </ScrollView>
  );
};

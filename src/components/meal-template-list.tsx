import { useRouter } from "expo-router";
import { Plus, SquarePen, Trash2 } from "lucide-react-native";
import { View } from "react-native";
import type z from "zod";
import { useFilteredMealTempaltes } from "../hooks/useFilteredMealTemplates";
import {
  type mealTemplateSchema,
  useDeleteMealTemplate,
} from "../queries/meal-templates";
import { useAddMeal } from "../queries/meals";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";
import { MealItem } from "./ui/meal-item";

export const MealTemplateList = () => {
  const router = useRouter();
  const data = useFilteredMealTempaltes();
  const { mutateAsync: deleteTemplate } = useDeleteMealTemplate();
  const { mutateAsync: addMeal } = useAddMeal();

  const onAdd = (template: z.infer<typeof mealTemplateSchema>) => {
    return async () => {
      await addMeal({ ...template, date: new Date() });
      router.back();
    };
  };

  const onDelete = (id: number) => {
    return async () => {
      await deleteTemplate(id);
    };
  };

  const onEdit = (id: number) => {
    return () => {
      router.navigate(`/meal-templates/${id}`);
    };
  };

  return (
    <View className="gap-4">
      {data.map((x) => (
        <MealItem key={x.id}>
          <MealItem.Title title={x.name} />

          <MealItem.Macros>
            <MealItem.Macro label="calories" unit="kcal" value={x.calories} />
            <MealItem.Macro label="carbs" unit="g" value={x.carbs} />
            <MealItem.Macro label="protein" unit="g" value={x.protein} />
            <MealItem.Macro label="fat" unit="g" value={x.fat} />
          </MealItem.Macros>

          <MealItem.Actions>
            <Button onPress={onAdd(x)} size="icon" variant="secondary">
              <Icon as={Plus} />
            </Button>

            <View className="flex-row ml-auto gap-1">
              <Button onPress={onEdit(x.id)} size="icon" variant="secondary">
                <Icon as={SquarePen} />
              </Button>

              <Button onPress={onDelete(x.id)} size="icon" variant="secondary">
                <Icon as={Trash2} />
              </Button>
            </View>
          </MealItem.Actions>
        </MealItem>
      ))}
    </View>
  );
};

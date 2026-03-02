import { Link, Stack, useRouter } from "expo-router";
import { Plus, RotateCcw, SquarePen, Trash2 } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import { Page } from "@/src/components/page";
import { Button } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { Input } from "@/src/components/ui/input";
import { MealItem } from "@/src/components/ui/meal-item";
import { Text } from "@/src/components/ui/text";
import { useFilteredTemplates } from "@/src/hooks/useFilteredTemplates";
import { useDeleteMealTemplate } from "@/src/queries/meal-templates";

const MealTemplates = () => {
  const { filter, updateFilter, resetFilter, filteredData } =
    useFilteredTemplates();
  const router = useRouter();
  const { mutateAsync } = useDeleteMealTemplate();

  const onDelete = (id: number) => {
    return () => {
      mutateAsync(id);
    };
  };

  const onEdit = (id: number) => {
    return () => {
      router.navigate(`/meal-templates/${id}`);
    };
  };

  return (
    <>
      <Stack.Screen options={{ title: "Meal Templates" }} />

      <Page>
        <View>
          <Link asChild href="/meal-templates/add">
            <Button>
              <Text>Add Template</Text>
            </Button>
          </Link>
        </View>

        <View className="flex-row gap-2 items-end">
          <View className="flex-1">
            <Input
              onChangeText={updateFilter}
              placeholder="Search by name..."
              value={filter}
            />
          </View>

          <Button onPress={resetFilter} size="icon" variant="secondary">
            <Icon as={RotateCcw} />
          </Button>
        </View>

        <ScrollView>
          <View className="gap-4">
            {filteredData.map((x) => (
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
                  <Button size="icon" variant="secondary">
                    <Icon as={Plus} />
                  </Button>

                  <View className="flex-row ml-auto gap-1">
                    <Button
                      onPress={onEdit(x.id)}
                      size="icon"
                      variant="secondary"
                    >
                      <Icon as={SquarePen} />
                    </Button>

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

export default MealTemplates;

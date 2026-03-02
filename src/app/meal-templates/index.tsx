import { Link, Stack, useRouter } from "expo-router";
import { SquarePen, Trash2 } from "lucide-react-native";
import { View } from "react-native";
import { Page } from "@/src/components/page";
import { Button } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
import { Text } from "@/src/components/ui/text";
import {
  useDeleteMealTemplate,
  useMealTemplates,
} from "@/src/queries/meal-templates";

const MealTemplates = () => {
  const router = useRouter();
  const { data } = useMealTemplates();
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

        <View>
          {data?.map((x) => (
            <View className="flex-row gap-1" key={x.id}>
              <View className="gap-1 flex-1">
                <Text className="text-xl">{x.name}</Text>

                <View className="flex-row gap-1">
                  <View className="flex-1">
                    <Text className="text-gray-600">{x.calories}</Text>
                    <Text className="text-gray-400 text-xs">kcal</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-600">{x.carbs}g</Text>
                    <Text className="text-gray-400 text-xs">carbs </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-600">{x.protein}g</Text>
                    <Text className="text-gray-400 text-xs">protein</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-600">{x.fat}g</Text>
                    <Text className="text-gray-400 text-xs">fat</Text>
                  </View>
                </View>
              </View>

              <View className="gap-1">
                <Button onPress={onEdit(x.id)} size="icon" variant="secondary">
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
            </View>
          ))}
        </View>
      </Page>
    </>
  );
};

export default MealTemplates;

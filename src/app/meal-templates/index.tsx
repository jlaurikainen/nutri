import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { Button } from "@/src/components/ui/button";
import { Text } from "@/src/components/ui/text";
import { useMealTemplates } from "@/src/queries/meal-templates";

const MealTemplates = () => {
  const { data } = useMealTemplates();

  return (
    <>
      <Stack.Screen options={{ title: "Meal Templates" }} />

      <View className="p-4 gap-4">
        <View>
          <Link asChild href="/meal-templates/add">
            <Button>
              <Text>Add Template</Text>
            </Button>
          </Link>
        </View>

        <View>
          {data?.map((x) => (
            <View className="gap-1 dark:bg-white/10 p-6 rounded-2xl" key={x.id}>
              <View className="flex-row justify-between items-center">
                <Text className="text-xl">{x.name}</Text>
                <Text className="text-xl">{x.calories} kcal</Text>
              </View>

              <View className="flex-row gap-4 ">
                <Text className="text-gray-400">Carbs: {x.carbs} </Text>
                <Text className="text-gray-400">Protein: {x.protein}</Text>
                <Text className="text-gray-400">Fat: {x.fat}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default MealTemplates;

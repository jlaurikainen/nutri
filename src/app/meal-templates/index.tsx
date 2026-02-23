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

      <View>
        <Text>{JSON.stringify(data)}</Text>
      </View>

      <Link asChild href="/meal-templates/add">
        <Button>
          <Text>Add Template</Text>
        </Button>
      </Link>
    </>
  );
};

export default MealTemplates;

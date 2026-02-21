import { Link, Stack } from "expo-router";
import { Button } from "@/src/components/ui/button";
import { Text } from "@/src/components/ui/text";

const MealTemplates = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Meal Templates" }} />
      <Text>This is where we list existing meal templates.</Text>
      <Link asChild href="/meal-templates/add">
        <Button>
          <Text>Add Template</Text>
        </Button>
      </Link>
    </>
  );
};

export default MealTemplates;

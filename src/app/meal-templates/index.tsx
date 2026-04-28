import { Link } from "expo-router";
import { ScrollView, View } from "react-native";
import { MealTempalteFilter } from "@/src/components/meal-templates/meal-template-filter";
import { MealTemplateList } from "@/src/components/meal-templates/meal-template-list";
import { Button } from "@/src/components/ui/button";
import { Page } from "@/src/components/ui/page";
import { Text } from "@/src/components/ui/text";

const MealTemplates = () => {
  return (
    <Page>
      <Text variant="h3">Meal Templates</Text>

      <MealTempalteFilter />

      <View>
        <Link asChild href="/meal-templates/add">
          <Button size="sm">
            <Text>Add New</Text>
          </Button>
        </Link>
      </View>

      <ScrollView>
        <MealTemplateList />
      </ScrollView>
    </Page>
  );
};

export default MealTemplates;

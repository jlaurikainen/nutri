import { Link } from "expo-router";
import { Plus } from "lucide-react-native";
import { View } from "react-native";
import { MealTempalteFilter } from "@/src/components/meal-templates/meal-template-filter";
import { MealTemplateList } from "@/src/components/meal-templates/meal-template-list";
import { Button } from "@/src/components/ui/button";
import { Icon } from "@/src/components/ui/icon";
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
            <Icon as={Plus} color="#ffffff" />
            <Text>New Template</Text>
          </Button>
        </Link>
      </View>

      <MealTemplateList />
    </Page>
  );
};

export default MealTemplates;

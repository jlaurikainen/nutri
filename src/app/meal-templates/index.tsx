import { Link, Stack } from "expo-router";
import { Plus } from "lucide-react-native";
import { Fragment } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MealTempalteFilter } from "@/src/components/meal-templates/meal-template-filter";
import { MealTemplateList } from "@/src/components/meal-templates/meal-template-list";
import { FAB } from "@/src/components/ui/fab";
import { Page } from "@/src/components/ui/page";

const MealTemplates = () => {
  const insets = useSafeAreaInsets();

  return (
    <Fragment>
      <Stack.Screen options={{ title: "Meal Templates" }} />
      <Page>
        <MealTempalteFilter />
        <MealTemplateList />
        <Link asChild href="/meal-templates/add">
          <FAB icon={Plus} style={{ bottom: insets.bottom + 16, left: 16 }} />
        </Link>
      </Page>
    </Fragment>
  );
};

export default MealTemplates;

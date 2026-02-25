import { Stack } from "expo-router";
import { MealTemplateForm } from "@/src/components/meal-template-form";

const Add = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Add Template" }} />

      <MealTemplateForm />
    </>
  );
};

export default Add;

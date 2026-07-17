import { Stack, useRouter } from "expo-router";
import { Fragment } from "react";
import { FormProvider } from "react-hook-form";
import { MealTemplateForm } from "@/src/components/meal-templates/meal-template-form";
import { useCreateMealTemplateForm } from "@/src/hooks/useCreateMealTemplateForm";

const Add = () => {
  const { form, onSubmit } = useCreateMealTemplateForm();
  const router = useRouter();

  const onCancel = () => {
    router.back();
  };

  return (
    <Fragment>
      <Stack.Screen options={{ title: "New Meal Template" }} />

      <FormProvider {...form}>
        <MealTemplateForm onCancel={onCancel} onSubmit={onSubmit} />
      </FormProvider>
    </Fragment>
  );
};

export default Add;

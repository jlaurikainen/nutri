import { Stack, useRouter } from "expo-router";
import { Fragment } from "react";
import { FormProvider } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { MealTemplateForm } from "@/src/components/meal-templates/meal-template-form";
import { MealTemplateFormActions } from "@/src/components/meal-templates/meal-template-form-actions";
import { Page } from "@/src/components/shared/page";
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

      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Page>
            <FormProvider {...form}>
              <MealTemplateForm />
            </FormProvider>

            <MealTemplateFormActions onCancel={onCancel} onSubmit={onSubmit} />
          </Page>
        </ScrollView>
      </KeyboardAvoidingView>
    </Fragment>
  );
};

export default Add;

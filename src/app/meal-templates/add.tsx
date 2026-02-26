import { Stack } from "expo-router";
import { Controller } from "react-hook-form";
import { Page } from "@/src/components/page";
import { Button } from "@/src/components/ui/button";
import { Field } from "@/src/components/ui/field";
import { Text } from "@/src/components/ui/text";
import { useCreateMealTemplateForm } from "@/src/hooks/create-meal-template-form";
import { tranformFieldProps } from "@/src/utils/field";

const Add = () => {
  const { control, onSubmit } = useCreateMealTemplateForm();

  return (
    <>
      <Stack.Screen options={{ title: "Add Template" }} />

      <Page>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Field
              autoFocus
              label="Name"
              returnKeyType="next"
              {...tranformFieldProps(field)}
            />
          )}
        />

        <Controller
          control={control}
          name="calories"
          render={({ field }) => (
            <Field
              inputMode="decimal"
              label="Calories"
              returnKeyType="next"
              {...tranformFieldProps(field)}
            />
          )}
        />

        <Controller
          control={control}
          name="carbs"
          render={({ field }) => (
            <Field
              inputMode="decimal"
              label="Carbs"
              returnKeyType="next"
              {...tranformFieldProps(field)}
            />
          )}
        />

        <Controller
          control={control}
          name="protein"
          render={({ field }) => (
            <Field
              inputMode="decimal"
              label="Protein"
              returnKeyType="next"
              {...tranformFieldProps(field)}
            />
          )}
        />

        <Controller
          control={control}
          name="fat"
          render={({ field }) => (
            <Field
              inputMode="decimal"
              label="Fat"
              {...tranformFieldProps(field)}
            />
          )}
        />

        <Button onPress={onSubmit}>
          <Text>Create Template</Text>
        </Button>
      </Page>
    </>
  );
};

export default Add;

import { Stack, useRouter } from "expo-router";
import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { Button } from "@/src/components/ui/button";
import { Field } from "@/src/components/ui/field";
import { Page } from "@/src/components/ui/page";
import { Text } from "@/src/components/ui/text";
import { useCreateMealTemplateForm } from "@/src/hooks/useCreateMealTemplateForm";
import { tranformFieldProps } from "@/src/lib/field";

const Add = () => {
  const { control, onSubmit } = useCreateMealTemplateForm();
  const router = useRouter();

  const onCancel = () => {
    router.back();
  };

  return (
    <Fragment>
      <Stack.Screen options={{ title: "New Meal Template" }} />

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

        <View className="flex-row gap-2">
          <Button className="flex-1" onPress={onCancel} variant="secondary">
            <Text>Cancel</Text>
          </Button>
          <Button className="flex-1" onPress={onSubmit}>
            <Text>Create Template</Text>
          </Button>
        </View>
      </Page>
    </Fragment>
  );
};

export default Add;

import { Stack, useRouter } from "expo-router";
import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { Button } from "@/src/components/shared/button";
import { Field } from "@/src/components/shared/field";
import { Page } from "@/src/components/shared/page";
import { Text } from "@/src/components/shared/text";
import { useCreateMealTemplateForm } from "@/src/hooks/useCreateMealTemplateForm";

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
        <View className="gap-2">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Field label="Name" returnKeyType="next" {...field} />
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
                {...field}
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
                {...field}
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
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="fat"
            render={({ field }) => (
              <Field inputMode="decimal" label="Fat" {...field} />
            )}
          />
        </View>

        <View className="flex-row gap-2 mt-auto">
          <Button className="flex-1" onPress={onCancel} variant="bordered">
            <Text>Cancel</Text>
          </Button>
          <Button className="flex-1" onPress={onSubmit}>
            <Text>Create</Text>
          </Button>
        </View>
      </Page>
    </Fragment>
  );
};

export default Add;

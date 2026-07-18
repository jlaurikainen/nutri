import { Controller, useFormContext } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import type { MealTemplateFormType } from "@/src/types/form";
import { Button } from "../shared/button";
import { Field } from "../shared/field";
import { Page } from "../shared/page";
import { Text } from "../shared/text";

interface Props {
  onCancel: () => void;
  onSubmit: () => Promise<void>;
}

export const MealTemplateForm = (props: Props) => {
  const { control } = useFormContext<MealTemplateFormType>();

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Page>
          <View className="mb-4 gap-2">
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
              name="sugar"
              render={({ field }) => (
                <Field
                  inputMode="decimal"
                  label="Sugar"
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
                <Field
                  inputMode="decimal"
                  label="Fat"
                  returnKeyType="next"
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="fiber"
              render={({ field }) => (
                <Field inputMode="decimal" label="Fiber" {...field} />
              )}
            />
          </View>

          <View className="mt-auto flex-row gap-2">
            <Button
              className="flex-1"
              onPress={props.onCancel}
              variant="bordered"
            >
              <Text>Cancel</Text>
            </Button>
            <Button className="flex-1" onPress={props.onSubmit}>
              <Text>Save</Text>
            </Button>
          </View>
        </Page>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

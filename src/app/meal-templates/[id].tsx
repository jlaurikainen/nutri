import { Stack, useRouter } from "expo-router";
import { Trash } from "lucide-react-native";
import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Button } from "@/src/components/shared/button";
import { Field } from "@/src/components/shared/field";
import { Icon } from "@/src/components/shared/icon";
import { Page } from "@/src/components/shared/page";
import { Text } from "@/src/components/shared/text";
import { useParsedLocalParams } from "@/src/hooks/useParsedLocalParams";
import { useUpdateMealTemplateForm } from "@/src/hooks/useUpdateMealTemplateForm";
import { useDeleteMealTemplate } from "@/src/queries/meal-templates";
import { toNumber } from "@/src/utils/number";
import { pathIdSchema } from "@/src/utils/search-params";

const Edit = () => {
  const { id } = useParsedLocalParams(pathIdSchema);
  const { control, onSubmit } = useUpdateMealTemplateForm(toNumber(id));
  const { mutate } = useDeleteMealTemplate();
  const router = useRouter();

  const onCancel = () => {
    router.back();
  };

  const onDelete = (id: number) => {
    return () => {
      mutate(id);
      router.back();
    };
  };

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerRight: () => {
            return (
              <Button
                onPress={onDelete(Number(id))}
                size="icon"
                variant="bordered"
              >
                <Icon as={Trash} />
              </Button>
            );
          },
          title: "Edit Template",
        }}
      />

      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <ScrollView className="bg-background">
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
              <Button className="flex-1" onPress={onCancel} variant="bordered">
                <Text>Cancel</Text>
              </Button>
              <Button className="flex-1" onPress={onSubmit}>
                <Text>Save</Text>
              </Button>
            </View>
          </Page>
        </ScrollView>
      </KeyboardAvoidingView>
    </Fragment>
  );
};

export default Edit;

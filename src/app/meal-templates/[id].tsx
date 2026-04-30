import { Stack, useRouter } from "expo-router";
import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { Button } from "@/src/components/ui/button";
import { Field } from "@/src/components/ui/field";
import { Page } from "@/src/components/ui/page";
import { Text } from "@/src/components/ui/text";
import { useParsedLocalParams } from "@/src/hooks/useParsedLocalParams";
import { useUpdateMealTemplateForm } from "@/src/hooks/useUpdateMealTemplateForm";
import { tranformFieldProps } from "@/src/lib/field";
import { toNumber } from "@/src/lib/number";
import { useDeleteMealTemplate } from "@/src/queries/meal-templates";
import { pathIdSchema } from "@/src/schemas/search-params";

const Edit = () => {
  const { id } = useParsedLocalParams(pathIdSchema);
  const { mutateAsync: deleteTemplate } = useDeleteMealTemplate();
  const { control, onSubmit } = useUpdateMealTemplateForm(toNumber(id));
  const router = useRouter();

  const onCancel = () => {
    router.back();
  };

  const onDelete = (id: number) => {
    return async () => {
      await deleteTemplate(id);
      router.back();
    };
  };

  return (
    <Fragment>
      <Stack.Screen options={{ title: "Edit Template" }} />

      <Page>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Field
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

        <View className="gap-2">
          <View className="flex-row gap-2">
            <Button className="flex-1" onPress={onCancel} variant="secondary">
              <Text>Cancel</Text>
            </Button>
            <Button className="flex-1" onPress={onSubmit}>
              <Text>Save Changes</Text>
            </Button>
          </View>

          <Button onPress={onDelete(Number(id))} variant="destructive">
            <Text>Delete Template</Text>
          </Button>
        </View>
      </Page>
    </Fragment>
  );
};

export default Edit;

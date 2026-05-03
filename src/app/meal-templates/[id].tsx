import { Stack, useRouter } from "expo-router";
import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/src/components/shared/button";
import { Field } from "@/src/components/shared/field";
import { Page } from "@/src/components/shared/page";
import { Text } from "@/src/components/shared/text";
import { useParsedLocalParams } from "@/src/hooks/useParsedLocalParams";
import { useUpdateMealTemplateForm } from "@/src/hooks/useUpdateMealTemplateForm";
import { useDeleteMealTemplate } from "@/src/queries/meal-templates";
import { toNumber } from "@/src/utils/number";
import { pathIdSchema } from "@/src/utils/search-params";

const Edit = () => {
  const { id } = useParsedLocalParams(pathIdSchema);
  const { mutateAsync: deleteTemplate } = useDeleteMealTemplate();
  const { control, onSubmit } = useUpdateMealTemplateForm(toNumber(id));
  const insets = useSafeAreaInsets();
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
      </Page>

      <View
        className="gap-2 absolute bg-background border-t border-foreground p-4"
        style={{ bottom: insets.bottom, insetInline: 0 }}
      >
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
    </Fragment>
  );
};

export default Edit;

import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { Page } from "@/src/components/page";
import { Button } from "@/src/components/ui/button";
import { Field } from "@/src/components/ui/field";
import { Text } from "@/src/components/ui/text";
import { useUpdateMealTemplateForm } from "@/src/hooks/useUpdateMealTemplateForm";
import { tranformFieldProps } from "@/src/lib/utils/field";
import { toNumber } from "@/src/lib/utils/number";

const Edit = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { control, onSubmit } = useUpdateMealTemplateForm(toNumber(id));
  const router = useRouter();

  const onCancel = () => {
    router.back();
  };

  return (
    <>
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

        <View className="flex-row gap-2">
          <Button className="flex-1" onPress={onCancel} variant="secondary">
            <Text>Cancel</Text>
          </Button>
          <Button className="flex-1" onPress={onSubmit}>
            <Text>Save Changes</Text>
          </Button>
        </View>
      </Page>
    </>
  );
};

export default Edit;

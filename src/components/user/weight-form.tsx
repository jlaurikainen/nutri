import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import z from "zod";
import { Button } from "@/src/components/shared/button";
import { Field } from "@/src/components/shared/field";
import { Text } from "@/src/components/shared/text";
import { useAddWeightMeasurement } from "@/src/queries/user-weight";
import { toNumber } from "@/src/utils/number";

export const WeightForm = () => {
  const { mutate } = useAddWeightMeasurement();
  const { control, handleSubmit, formState } = useForm();
  const { isDirty, isValid } = formState;
  const router = useRouter();

  const onSubmit = handleSubmit((formData) => {
    const { data, success } = z
      .object({ weight: z.string() })
      .safeParse(formData);

    if (!success) return;

    mutate(toNumber(data.weight));
    router.back();
  });

  return (
    <View className="flex-row items-end gap-2">
      <Controller
        control={control}
        name="weight"
        render={({ field }) => (
          <View className="flex-2">
            <Field inputMode="decimal" label="Weight" {...field} />
          </View>
        )}
      />
      <Button disabled={!isDirty || !isValid} onPress={onSubmit}>
        <Text>Update</Text>
      </Button>
    </View>
  );
};

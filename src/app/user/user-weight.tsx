import { Stack, useRouter } from "expo-router";
import { Fragment, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import z from "zod";
import { Button } from "@/src/components/shared/button";
import { Field } from "@/src/components/shared/field";
import { Page } from "@/src/components/shared/page";
import { Text } from "@/src/components/shared/text";
import {
  useAddWeightMeasurement,
  useUserWeight,
} from "@/src/queries/user-weight";
import { toNumber } from "@/src/utils/number";

const UserWeight = () => {
  const { data: weight } = useUserWeight();
  const { mutateAsync } = useAddWeightMeasurement();
  const { control, handleSubmit, reset, formState } = useForm<{
    weight: string;
  }>();
  const { isDirty } = formState;
  const router = useRouter();

  const onSubmit = handleSubmit(async (formData) => {
    const { data, success } = z
      .object({ weight: z.number() })
      .safeParse({ weight: toNumber(formData.weight) });

    if (!success) return;

    await mutateAsync(data.weight).then(router.back);
  });

  useEffect(() => {
    if (!weight) return;

    reset({ weight: weight.weight.toLocaleString("fi") });
  }, [reset, weight]);

  return (
    <Fragment>
      <Stack.Screen options={{ title: "User Weight" }} />
      <Page>
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
          <Button disabled={!isDirty} onPress={onSubmit}>
            <Text>Update</Text>
          </Button>
        </View>
      </Page>
    </Fragment>
  );
};

export default UserWeight;

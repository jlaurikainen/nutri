import { Stack, useRouter } from "expo-router";
import { Fragment, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/src/components/shared/button";
import { Field } from "@/src/components/shared/field";
import { Page } from "@/src/components/shared/page";
import { Text } from "@/src/components/shared/text";
import {
  type User as UserType,
  userSchema,
  useUpdateUser,
  useUser,
} from "@/src/queries/user";

const ACTIVITY_TO_READABLE = {
  0: "Sedentary",
  1: "Exercise 1-3 times/week",
  2: "Exercise 4-5 times/week",
  3: "Daily exercise",
  4: "Intense daily exercise",
  5: "Very intense daily exercise",
} as const;

const User = () => {
  const { data: user } = useUser();
  const { mutateAsync } = useUpdateUser();
  const { control, handleSubmit, reset } = useForm<UserType>();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const onCancel = () => {
    router.back();
  };

  const onSubmit = handleSubmit(async (formData) => {
    const { data, success } = userSchema.safeParse(formData);

    if (!success) return;

    await mutateAsync(data);

    router.back();
  });

  useEffect(() => {
    if (!user) return;

    reset(user);
  }, [reset, user]);

  return (
    <Fragment>
      <Stack.Screen options={{ title: "User" }} />

      <Page>
        <ScrollView>
          {!user ? null : (
            <View className="gap-2">
              <Controller
                control={control}
                name="age"
                render={({ field }) => (
                  <Field inputMode="numeric" label="Age" {...field} />
                )}
              />

              <Controller
                control={control}
                name="height"
                render={({ field }) => (
                  <Field inputMode="numeric" label="Height (cm)" {...field} />
                )}
              />

              <View className="gap-1">
                <Text>Sex:</Text>

                <Controller
                  control={control}
                  name="sex"
                  render={({ field }) => (
                    <View className="flex-row">
                      <Button
                        className="flex-1"
                        onPress={() => field.onChange(0)}
                        variant={field.value === 0 ? "selectable" : "secondary"}
                      >
                        <Text>Male</Text>
                      </Button>
                      <Button
                        className="flex-1"
                        onPress={() => field.onChange(1)}
                        variant={field.value === 1 ? "selectable" : "secondary"}
                      >
                        <Text>Female</Text>
                      </Button>
                    </View>
                  )}
                />
              </View>

              <View className="gap-1">
                <Text>Activity Level:</Text>

                <Controller
                  control={control}
                  name="activity"
                  render={({ field }) => (
                    <View className="">
                      {Object.entries(ACTIVITY_TO_READABLE).map(([k, v]) => (
                        <Button
                          className="-mt-px"
                          key={k}
                          onPress={() => field.onChange(+k)}
                          variant={
                            field.value === +k ? "selectable" : "secondary"
                          }
                        >
                          <Text>{v}</Text>
                        </Button>
                      ))}
                    </View>
                  )}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </Page>

      <View
        className="gap-2 flex-row mt-4 bg-background border-t border-foreground absolute p-4"
        style={{ bottom: insets.bottom, insetInline: 0 }}
      >
        <Button className="flex-1" onPress={onCancel} variant="secondary">
          <Text>Cancel</Text>
        </Button>
        <Button className="flex-1" onPress={onSubmit}>
          <Text>Save Changes</Text>
        </Button>
      </View>
    </Fragment>
  );
};

export default User;

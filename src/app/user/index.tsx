import { Stack } from "expo-router";
import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Button } from "@/src/components/shared/button";
import { Field } from "@/src/components/shared/field";
import { Page } from "@/src/components/shared/page";
import { Text } from "@/src/components/shared/text";
import { useUserFormView } from "@/src/hooks/useUserFormView";
import { type User as UserType, useUser } from "@/src/queries/user";

const ACTIVITY_TO_READABLE = {
  0: "Sedentary",
  1: "Exercise 1-3 times/week",
  2: "Exercise 4-5 times/week",
  3: "Daily exercise",
  4: "Intense daily exercise",
  5: "Very intense daily exercise",
} as const;

const User = () => {
  const { data } = useUser();

  if (data === undefined) return null;

  return <UserView user={data} />;
};

interface UserProps {
  user: UserType;
}

const UserView = ({ user }: UserProps) => {
  const { control, onCancel, onSubmit } = useUserFormView(user);

  return (
    <Fragment>
      <Stack.Screen options={{ title: "User" }} />
      <Page>
        <ScrollView>
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
                      onPress={() => field.onChange("0")}
                      variant={field.value === "0" ? "selectable" : "bordered"}
                    >
                      <Text>Male</Text>
                    </Button>
                    <Button
                      className="flex-1"
                      onPress={() => field.onChange("1")}
                      variant={field.value === "1" ? "selectable" : "bordered"}
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
                        onPress={() => field.onChange(k)}
                        variant={field.value === k ? "selectable" : "bordered"}
                      >
                        <Text>{v}</Text>
                      </Button>
                    ))}
                  </View>
                )}
              />
            </View>
          </View>
        </ScrollView>
        <View className="flex-row gap-2">
          <Button className="flex-1" onPress={onCancel} variant="bordered">
            <Text>Cancel</Text>
          </Button>
          <Button className="flex-1" onPress={onSubmit}>
            <Text>Save Changes</Text>
          </Button>
        </View>
      </Page>
    </Fragment>
  );
};

export default User;

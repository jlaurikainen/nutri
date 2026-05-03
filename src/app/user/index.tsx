import { Stack } from "expo-router";
import { Fragment } from "react";
import { Page } from "@/src/components/shared/page";
import { Text } from "@/src/components/shared/text";
import { useUser } from "@/src/queries/user";
import { formatNumber } from "@/src/utils/number";
import { calculateBMR } from "@/src/utils/user";

const ACTIVITY_TO_READABLE = {
  0: "Sedentary",
  1: "Exercise 1-3 times/week",
  2: "Exercise 4-5 times/week",
  3: "Daily exercise",
  4: "Intense daily exercise",
  5: "Very intense daily exercise",
} as const;

const SEX_TO_READABLE = {
  0: "Male",
  1: "Female",
} as const;

const User = () => {
  const { data: user } = useUser();

  const userBMR = calculateBMR(user, 70);

  return (
    <Fragment>
      <Stack.Screen options={{ title: "User" }} />
      <Page>
        {!user ? null : (
          <Fragment>
            <Text>Age: {user.age}</Text>
            <Text>Sex: {SEX_TO_READABLE[user.sex]}</Text>
            <Text>Activity: {ACTIVITY_TO_READABLE[user.activity]}</Text>
            <Text>Height: {user.height}</Text>
          </Fragment>
        )}
        <Text>
          {!user
            ? "Missing user data to calculate BMR."
            : `BMR: ${formatNumber(userBMR)}kcal`}
        </Text>
      </Page>
    </Fragment>
  );
};

export default User;

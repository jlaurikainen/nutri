import { Stack } from "expo-router";
import { Fragment } from "react";
import { Page } from "@/src/components/shared/page";
import { Text } from "@/src/components/shared/text";
import { useUser } from "@/src/queries/user";

const User = () => {
  const { data } = useUser();

  return (
    <Fragment>
      <Stack.Screen options={{ title: "User" }} />
      <Page>
        <Text>{JSON.stringify(data, null, 2)}</Text>
      </Page>
    </Fragment>
  );
};

export default User;

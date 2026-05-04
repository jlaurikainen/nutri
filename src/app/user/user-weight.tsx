import { Stack } from "expo-router";
import { Fragment } from "react";
import { Page } from "@/src/components/shared/page";
import { WeightForm } from "@/src/components/user/weight-form";
import { WeightHistory } from "@/src/components/user/weight-history";

const UserWeight = () => {
  return (
    <Fragment>
      <Stack.Screen options={{ title: "User Weight" }} />
      <Page>
        <WeightForm />
        <WeightHistory />
      </Page>
    </Fragment>
  );
};

export default UserWeight;

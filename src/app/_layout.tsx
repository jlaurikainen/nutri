import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Contexts } from "../components/app/contexts";

const RootLayout = () => {
  return (
    <Contexts>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
      {/* <BottomBar /> */}
      <PortalHost />
    </Contexts>
  );
};

export default RootLayout;

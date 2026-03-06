import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { BottomBar } from "../components/bottom-bar";
import { Contexts } from "../components/contexts";

const RootLayout = () => {
  return (
    <Contexts>
      <Stack screenOptions={{ headerShown: false }} />
      <BottomBar />
      <PortalHost />
    </Contexts>
  );
};

export default RootLayout;

import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { BottomBar } from "../components/app/bottom-bar";
import { Contexts } from "../components/app/contexts";

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

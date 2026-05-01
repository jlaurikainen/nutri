import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Contexts } from "../components/app/contexts";

const RootLayout = () => {
  const [fonts] = useFonts({
    "SpaceGrotesk-Bold": require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
    "SpaceGrotesk-Medium": require("../assets/fonts/SpaceGrotesk-Medium.ttf"),
    "SpaceGrotesk-Regular": require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
  });

  if (!fonts) {
    return null;
  }

  return (
    <Contexts>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "SpaceGrotesk-Regular",
            fontWeight: "normal",
          },
        }}
      />
      <PortalHost />
    </Contexts>
  );
};

export default RootLayout;

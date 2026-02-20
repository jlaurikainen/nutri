import { ThemeProvider } from "@react-navigation/native";
import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { useUniwind } from "uniwind";
import { NAV_THEME } from "../lib/theme";

const RootLayout = () => {
  const { theme } = useUniwind();

  return (
    <ThemeProvider value={NAV_THEME[theme]}>
      <Stack />
      <PortalHost />
    </ThemeProvider>
  );
};

export default RootLayout;

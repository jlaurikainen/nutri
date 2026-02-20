import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <>
      <Stack />
      <PortalHost />
    </>
  );
};

export default RootLayout;

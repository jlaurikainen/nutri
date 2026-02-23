import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { Contexts } from "../components/contexts";

const RootLayout = () => {
  return (
    <Contexts>
      <Stack />
      <PortalHost />
    </Contexts>
  );
};

export default RootLayout;

import { Stack } from "expo-router";
import { View } from "react-native";
import { Button } from "../components/ui/button";
import { Text } from "../components/ui/text";

const Home = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />
      <View>
        <Button>
          <Text>Button</Text>
        </Button>
      </View>
    </>
  );
};

export default Home;

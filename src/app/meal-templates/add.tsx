import { Stack } from "expo-router";
import { View } from "react-native";
import { Text } from "@/src/components/ui/text";

const Add = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Add Template" }} />
      <View>
        <Text>
          This is where we have a form component for adding a meal template.
        </Text>
      </View>
    </>
  );
};

export default Add;

import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "@/src/components/ui/text";

const Edit = () => {
  const { _id } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: "Edit Template" }} />
      <View>
        <Text>
          This is where we have a form component for editing a meal template.
        </Text>
      </View>
    </>
  );
};

export default Edit;

import { View } from "react-native";
import { Button } from "../shared/button";
import { Text } from "../shared/text";

interface Props {
  onCancel: () => void;
  onSubmit: () => Promise<void>;
}

export const MealTemplateFormActions = (props: Props) => {
  return (
    <View className="mt-auto flex-row gap-2">
      <Button className="flex-1" onPress={props.onCancel} variant="bordered">
        <Text>Cancel</Text>
      </Button>
      <Button className="flex-1" onPress={props.onSubmit}>
        <Text>Save</Text>
      </Button>
    </View>
  );
};

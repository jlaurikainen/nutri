import { useLocalSearchParams } from "expo-router";
import { RotateCcw } from "lucide-react-native";
import { View } from "react-native";
import { useQueryFilter } from "@/src/hooks/useQueryFilter";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Input } from "../ui/input";

export const MealTempalteFilter = () => {
  const { query = "" } = useLocalSearchParams<{ query?: string }>();
  const { clearQuery, updateQuery } = useQueryFilter();

  return (
    <View className="flex-row gap-2 items-end">
      <View className="flex-1">
        <Input
          onChangeText={updateQuery}
          placeholder="Search by name..."
          value={query}
        />
      </View>

      <Button onPress={clearQuery} size="icon" variant="secondary">
        <Icon as={RotateCcw} />
      </Button>
    </View>
  );
};

import { RotateCcw } from "lucide-react-native";
import { View } from "react-native";
import { useParsedLocalParams } from "@/src/hooks/useParsedLocalParams";
import { useQueryFilter } from "@/src/hooks/useQueryFilter";
import { querySchema } from "@/src/utils/search-params";
import { Button } from "../shared/button";
import { Icon } from "../shared/icon";
import { Input } from "../shared/input";

export const MealTempalteFilter = () => {
  const { query = "" } = useParsedLocalParams(querySchema);
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

      <Button onPress={clearQuery} size="icon" variant="bordered">
        <Icon as={RotateCcw} />
      </Button>
    </View>
  );
};

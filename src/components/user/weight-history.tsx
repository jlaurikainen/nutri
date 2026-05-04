import { Trash } from "lucide-react-native";
import { View } from "react-native";
import {
  useDeleteWeightMeasurement,
  useUserWeights,
} from "@/src/queries/user-weight";
import { addDays, endOfDay, startOfDay, toDate } from "@/src/utils/date";
import { Button } from "../shared/button";
import { Icon } from "../shared/icon";
import { MealItem } from "../shared/meal-item";
import { Text } from "../shared/text";

const TODAY = endOfDay(new Date());
const WEEK_AGO = startOfDay(addDays(TODAY, -6));

export const WeightHistory = () => {
  const { data = [] } = useUserWeights({
    end: TODAY,
    limit: 20,
    start: WEEK_AGO,
  });
  const { mutate } = useDeleteWeightMeasurement();

  const onDelete = (id: number) => {
    return () => {
      mutate(id);
    };
  };

  return (
    <View className="gap-2">
      <Text className="-mb-1">Measurement History</Text>
      {data.map((x) => (
        <MealItem key={x.id}>
          <MealItem.Heading>
            <MealItem.Macros>
              <MealItem.Macro
                label={toDate(`${x.date}Z`).toLocaleString("fi", {
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  month: "numeric",
                  year: "numeric",
                })}
                unit="kg"
                value={x.weight}
              />
              <View>
                <Button onPress={onDelete(x.id)} size="icon" variant="bordered">
                  <Icon as={Trash} />
                </Button>
              </View>
            </MealItem.Macros>
          </MealItem.Heading>
        </MealItem>
      ))}
    </View>
  );
};

import { Trash } from "lucide-react-native";
import { Fragment } from "react";
import { ScrollView, View } from "react-native";
import {
  useDeleteWeightMeasurement,
  useUserWeights,
} from "@/src/queries/user-weight";
import { toDate } from "@/src/utils/date";
import { Button } from "../shared/button";
import { Icon } from "../shared/icon";
import { MealItem } from "../shared/meal-item";
import { Text } from "../shared/text";

export const WeightHistory = () => {
  const { data = [] } = useUserWeights({
    limit: 14,
  });
  const { mutate } = useDeleteWeightMeasurement();

  const onDelete = (id: number) => {
    return () => {
      mutate(id);
    };
  };

  return (
    <Fragment>
      <Text className="-mb-2">Measurement History</Text>

      <ScrollView>
        <View className="gap-2">
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
                    <Button
                      onPress={onDelete(x.id)}
                      size="icon"
                      variant="bordered"
                    >
                      <Icon as={Trash} />
                    </Button>
                  </View>
                </MealItem.Macros>
              </MealItem.Heading>
            </MealItem>
          ))}
        </View>
      </ScrollView>
    </Fragment>
  );
};

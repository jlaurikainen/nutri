import { Fragment } from "react";
import { Alert, Pressable, ScrollView, View } from "react-native";
import {
  useDeleteWeightMeasurement,
  useUserWeights,
} from "@/src/queries/user-weight";
import { toDate } from "@/src/utils/date";
import { MealItem } from "../shared/meal-item";
import { Text } from "../shared/text";

export const WeightHistory = () => {
  const { data = [] } = useUserWeights(14);
  const { mutate } = useDeleteWeightMeasurement();

  const onDelete = (id: number) => {
    Alert.alert(
      "Delete Measurement",
      "Are you sure you want to delete this measurement?",
      [
        {
          text: "Cancel",
        },
        {
          onPress: () => mutate(id),
          text: "Delete",
        },
      ],
    );
  };

  return (
    <Fragment>
      <Text className="-mb-2">Measurement History</Text>

      <ScrollView>
        <View className="gap-2">
          {data.map((x) => (
            <Pressable key={x.id} onLongPress={() => onDelete(x.id)}>
              <MealItem>
                <View className="flex-row justify-between gap-2">
                  <Text>
                    {toDate(`${x.date}Z`).toLocaleString("fi", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </Text>
                  <Text>{x.weight}kg</Text>
                </View>
              </MealItem>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Fragment>
  );
};

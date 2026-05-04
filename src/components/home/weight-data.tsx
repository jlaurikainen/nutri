import { Portal } from "@rn-primitives/portal";
import { Fragment, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserBMR } from "@/src/queries/user";
import {
  useAddWeightMeasurement,
  useUserWeight,
} from "@/src/queries/user-weight";
import { formatNumber } from "@/src/utils/number";
import { Button } from "../shared/button";
import { Input } from "../shared/input";
import { Text } from "../shared/text";

export const WeightData = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [weight, setWeight] = useState("");
  const { data: weightData } = useUserWeight();
  const { mutateAsync } = useAddWeightMeasurement();
  const bmr = useUserBMR();
  const insets = useSafeAreaInsets();

  const addWeight = async () => {
    await mutateAsync(+weight);
  };

  return (
    <Fragment>
      <View>
        <View className="aspect-video justify-center gap-4">
          {!weightData?.weight ? (
            <Text className="text-center text-lg">No Weight Data Found</Text>
          ) : (
            <Text className="text-center text-lg">
              BMR: {formatNumber(bmr, 0)}
              kcal
            </Text>
          )}
          <Button className="self-center" onPress={() => setShowDialog(true)}>
            <Text>Add Weight</Text>
          </Button>
        </View>
      </View>

      {showDialog ? (
        <Portal name="dialog">
          <View
            className="absolute top-0 inset-x-0 bg-foreground/90 items-center justify-center-safe"
            style={{ bottom: insets.bottom }}
          >
            <View className="bg-background border border-foreground p-4 gap-4 max-w-[80%] w-full">
              <Text className="text-lg">Add Weight Measurement</Text>
              <View className="flex-row">
                <Input
                  className="flex-1"
                  inputMode="decimal"
                  onChange={(x) => setWeight(`${x}`)}
                  placeholder="Weight"
                  value={weight}
                />
              </View>
              <View className="flex-row gap-2">
                <Button
                  className="flex-1"
                  onPress={() => setShowDialog(false)}
                  variant="bordered"
                >
                  <Text>Cancel</Text>
                </Button>
                <Button
                  className="flex-1"
                  onPress={() => {
                    addWeight();
                    setShowDialog(false);
                  }}
                >
                  <Text>Add</Text>
                </Button>
              </View>
            </View>
          </View>
        </Portal>
      ) : null}
    </Fragment>
  );
};

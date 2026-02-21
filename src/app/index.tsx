import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { Button } from "../components/ui/button";
import { Insight } from "../components/ui/insight";
import { Text } from "../components/ui/text";

const Home = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />

      <View className="grid grid-cols-2 gap-4 p-8">
        <Insight amount={100} title="Kcal" />
        <Insight amount={100} title="Carbs" />
        <Insight amount={100} title="Protein" />
        <Insight amount={100} title="Fat" />
      </View>

      <View className="px-8">
        <Text>Here there should be a quick pick for a meal.</Text>

        <Link asChild href="/meal-templates">
          <Button>
            <Text>Meal Templates</Text>
          </Button>
        </Link>
      </View>

      <View className="p-8">
        <Text>This is where we would list todays meals.</Text>
      </View>
    </>
  );
};

export default Home;

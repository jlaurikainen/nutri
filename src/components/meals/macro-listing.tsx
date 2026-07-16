import type { reduceToDailyMacros } from "@/src/utils/macros";
import { List } from "../shared/list";
import { Text } from "../shared/text";

export const MacroListing = (props: ReturnType<typeof reduceToDailyMacros>) => {
  return (
    <List>
      <List.Heading>Total Macros</List.Heading>
      <List.Item>
        <Text>Calories:</Text>
        <Text>{props.calories}kcal</Text>
      </List.Item>
      <List.Item>
        <Text>Carbs:</Text>
        <Text>{props.carbs}g</Text>
      </List.Item>
      <List.Item>
        <Text>Sugar:</Text>
        <Text>{props.sugar}g</Text>
      </List.Item>
      <List.Item>
        <Text>Fat:</Text>
        <Text>{props.fat}g</Text>
      </List.Item>
      <List.Item>
        <Text>Protein:</Text>
        <Text>{props.protein}g</Text>
      </List.Item>
      <List.Item>
        <Text>Fiber:</Text>
        <Text>{props.fiber}g</Text>
      </List.Item>
    </List>
  );
};

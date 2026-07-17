import type { reduceToDailyMacros } from "@/src/utils/macros";
import { formatNumber } from "@/src/utils/number";
import { List } from "../shared/list";
import { Text } from "../shared/text";

export const MacroListing = (props: ReturnType<typeof reduceToDailyMacros>) => {
  return (
    <List>
      <List.Heading>Total Macros</List.Heading>
      <List.Item>
        <Text>Calories:</Text>
        <Text>{formatNumber(props.calories)}kcal</Text>
      </List.Item>
      <List.Item>
        <Text>Carbs:</Text>
        <Text>{formatNumber(props.carbs)}g</Text>
      </List.Item>
      <List.Item>
        <Text>Sugar:</Text>
        <Text>{formatNumber(props.sugar)}g</Text>
      </List.Item>
      <List.Item>
        <Text>Fat:</Text>
        <Text>{formatNumber(props.fat)}g</Text>
      </List.Item>
      <List.Item>
        <Text>Protein:</Text>
        <Text>{formatNumber(props.protein)}g</Text>
      </List.Item>
      <List.Item>
        <Text>Fiber:</Text>
        <Text>{formatNumber(props.fiber)}g</Text>
      </List.Item>
    </List>
  );
};

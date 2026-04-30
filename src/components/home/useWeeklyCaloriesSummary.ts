import {
  addDays,
  endOfDay,
  startOfDay,
  toDateOnlyTZISO,
} from "@/src/lib/utils/date";
import { useMeals } from "@/src/queries/meals";

const END_OF_TODAY = endOfDay(new Date());
const WEEK_AGO = addDays(startOfDay(new Date()), -6);

export const useWeeklyCaloriesSummary = () => {
  const { data = [] } = useMeals({ end: END_OF_TODAY, start: WEEK_AGO });

  const weeklyCalories = data.reduce(
    (a, c) => {
      const dateOnlyString = toDateOnlyTZISO(new Date(c.date));

      if (!(dateOnlyString in a)) {
        return a;
      }

      a[dateOnlyString] += c.calories;

      return a;
    },
    new Array(7).fill(null).reduce((a: Record<string, number>, _c, i) => {
      const dateString = toDateOnlyTZISO(addDays(WEEK_AGO, i));

      if (!a[dateString]) {
        a[dateString] = 0;
      }

      return a;
    }, {}),
  );

  const weekAverage =
    Object.values(weeklyCalories).reduce((a, c) => (a += c), 0) /
    Object.values(weeklyCalories).filter((x) => x > 0).length;

  return { weekAverage, weeklyCalories };
};

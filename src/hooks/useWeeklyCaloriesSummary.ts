import { useMeals } from "@/src/queries/meals";
import {
  addDays,
  difference,
  endOfDay,
  startOfDay,
  toTimezoneAwareISOString,
} from "@/src/utils/date";

const END_OF_TODAY = endOfDay(new Date());
const WEEK_AGO = startOfDay(addDays(END_OF_TODAY, -6));

export const useWeeklyCaloriesSummary = () => {
  const { data = [] } = useMeals({ end: END_OF_TODAY, start: WEEK_AGO });

  const weeklyCalories = data.reduce(
    (a, c) => {
      if (!(c.date in a)) {
        return a;
      }

      a[c.date] += c.calories;

      return a;
    },
    new Array(difference(WEEK_AGO, END_OF_TODAY))
      .fill(null)
      .reduce((a: Record<string, number>, _c, i) => {
        const dateString = toTimezoneAwareISOString(addDays(WEEK_AGO, i));

        if (!a[dateString]) {
          a[dateString] = 0;
        }

        return a;
      }, {}),
  );

  const weekAverage =
    Object.values(weeklyCalories).reduce((a, c) => (a += c), 0) /
    Math.max(Object.values(weeklyCalories).filter((x) => x > 0).length, 1);

  return { weekAverage, weeklyCalories };
};

import { useMeals } from "@/src/queries/meals";
import {
  addDays,
  difference,
  endOfDay,
  startOfDay,
  toTimezoneAwareISOString,
} from "@/src/utils/date";

const TODAY = endOfDay(new Date());
const WEEK_AGO = startOfDay(addDays(TODAY, -6));

export const useWeeklyCaloriesSummary = () => {
  const { data = [] } = useMeals({ end: TODAY, start: WEEK_AGO });

  const weeklyCalories = Object.entries(
    data.reduce(
      (a, c) => {
        if (!(c.date in a)) {
          return a;
        }

        a[c.date] += c.calories;

        return a;
      },
      new Array(difference(WEEK_AGO, TODAY))
        .fill(null)
        .reduce((a: Record<string, number>, _c, i) => {
          const dateString = toTimezoneAwareISOString(addDays(WEEK_AGO, i));

          if (!a[dateString]) {
            a[dateString] = 0;
          }

          return a;
        }, {}),
    ),
  ).map(([key, value]) => ({ calories: value, date: key }));

  const nonEmptyDayCalories = weeklyCalories.filter((x) => x.calories > 0);
  const weeklyAverage =
    nonEmptyDayCalories.reduce((a, c) => (a += c.calories), 0) /
    (nonEmptyDayCalories.length || 1);

  return { weeklyAverage, weeklyCalories };
};

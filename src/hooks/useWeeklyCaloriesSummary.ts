import { useMemo } from "react";
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

  const weeklyCalories = useMemo(() => {
    const weekMap = new Map<string, number>();

    /** Init all days for the weekly range of dates */
    for (let i = 0; i < difference(WEEK_AGO, TODAY); i++) {
      weekMap.set(toTimezoneAwareISOString(addDays(WEEK_AGO, i)), 0);
    }

    for (const meal of data) {
      const currentCalories = weekMap.get(meal.date) ?? 0;
      weekMap.set(meal.date, currentCalories + meal.calories);
    }

    return [...weekMap].map(([date, calories]) => ({ calories, date }));
  }, [data]);

  const nonEmptyDays = weeklyCalories.filter((x) => x.calories > 0);
  const totalCalories = nonEmptyDays.reduce((a, c) => (a += c.calories), 0);
  const weeklyAverage = totalCalories / (nonEmptyDays.length || 1);

  return { weeklyAverage, weeklyCalories };
};

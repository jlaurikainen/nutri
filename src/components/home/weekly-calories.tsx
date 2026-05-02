import { useWeeklyCaloriesSummary } from "../../hooks/useWeeklyCaloriesSummary";
import { BarChart } from "../shared/bar-chart";

export function WeeklyCalories() {
  const { weeklyCalories } = useWeeklyCaloriesSummary();

  return <BarChart values={weeklyCalories} />;
}

import type { User } from "../queries/user";

const ACTIVITY_LEVEL_COUNT = 5;
const ACTIVITY_MULTIPLIER_MIX_MAX_DIFFERENCE = 1.9 - 1.2;
const ACTIVITY_MULTIPLIER =
  ACTIVITY_MULTIPLIER_MIX_MAX_DIFFERENCE / ACTIVITY_LEVEL_COUNT;

const getActivityMultiplier = (activity: User["activity"]) => {
  return 1.2 + ACTIVITY_MULTIPLIER * activity;
};

const AGE_MULTIPLIER = -5; // -5 kcal per year of age
const HEIGHT_MULTIPLIER = 6.25;
const MALE_ADJUSTMENT = 5;
const FEMALE_ADJUSTMENT = -161;
const WEIGHT_MULTIPLIER = 10;

/** Mifflin-St Jeor Equation
 * For men:   BMR = 10W + 6.25H - 5A + 5
 * For womem: BMR = 10W + 6.25H - 5A - 161
 */
export const calculateBMR = (
  user: User | undefined,
  weight: number | undefined,
) => {
  if (!user || !weight) return 0;

  const activityMultiplier = getActivityMultiplier(user.activity);
  const agePortion = AGE_MULTIPLIER * user.age;
  const heightPortion = HEIGHT_MULTIPLIER * user.height;
  const sexAdjustment = user.sex === 0 ? MALE_ADJUSTMENT : FEMALE_ADJUSTMENT;
  const weightPortion = WEIGHT_MULTIPLIER * weight;

  const BMRBase = agePortion + heightPortion + weightPortion + sexAdjustment;
  const BMRAdjusted = BMRBase * activityMultiplier;

  return BMRAdjusted;
};

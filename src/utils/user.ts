import type { User } from "../queries/user";

const ACTIVITY_MULTIPLIER = [1.2, 1.34, 1.48, 1.62, 1.76, 1.9];
const AGE_MULTIPLIER = -5; // -5 kcal per year of age
const HEIGHT_MULTIPLIER = 6.25;
const SEX_ADJUSTMENT = [5, -161]; // male, female
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

  const ageBMR = AGE_MULTIPLIER * user.age;
  const heightBMR = HEIGHT_MULTIPLIER * user.height;
  const sexBMR = SEX_ADJUSTMENT[user.sex];
  const weightBMR = WEIGHT_MULTIPLIER * weight;

  const baseBMR = ageBMR + heightBMR + weightBMR + sexBMR;

  return baseBMR * ACTIVITY_MULTIPLIER[user.activity];
};

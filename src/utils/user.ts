import type { User } from "../queries/user";

export const userActivityModifier = (activity: User["activity"]) => {
  switch (activity) {
    case 0:
      return 1.2;
    case 1:
      return 1.32;
    case 2:
      return 1.44;
    case 3:
      return 1.56;
    case 4:
      return 1.68;
    case 5:
      return 1.9;
  }
};

export const calculateBMR = (
  user: User | undefined,
  weight: number | undefined,
) => {
  if (!user || !weight) return 0;

  return (
    (10 * weight +
      6.25 * user.height -
      5 * user.age +
      (user.sex === 0 ? 5 : -161)) *
    userActivityModifier(user.activity)
  );
};

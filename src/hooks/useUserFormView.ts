import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { type User, userSchema, useUpdateUser } from "../queries/user";
import type { UserFormType } from "../types/form";
import { toFormObject } from "../utils/form";
import { toNumber } from "../utils/number";

export const useUserFormView = (user: User) => {
  const { mutate } = useUpdateUser();
  const { control, handleSubmit } = useForm<UserFormType>({
    defaultValues: toFormObject(user),
  });
  const router = useRouter();

  const onCancel = () => {
    router.back();
  };

  const onSubmit = handleSubmit((formData) => {
    const { data, success } = userSchema.safeParse({
      activity: toNumber(formData.activity),
      age: toNumber(formData.age),
      height: toNumber(formData.height),
      id: user.id,
      sex: toNumber(formData.sex),
    });

    if (!success) return;

    mutate(data);
    router.back();
  });

  return { control, onCancel, onSubmit };
};

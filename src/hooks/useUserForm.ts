import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { userSchema, useUpdateUser, useUser } from "../queries/user";
import { formatNumber, toNumber } from "../utils/number";

export const useUserForm = () => {
  const { data } = useUser();
  const { mutate } = useUpdateUser();
  const { control, handleSubmit, reset } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit((formData) => {
    const { data, success } = userSchema.safeParse({
      activity: formData.activity,
      age: toNumber(formData.age),
      height: toNumber(formData.height),
      id: formData.id,
      sex: formData.sex,
    });

    if (!success) return;

    mutate(data);
    router.back();
  });

  useEffect(() => {
    if (!data) return;

    reset({
      activity: data.activity,
      age: formatNumber(data.age),
      height: formatNumber(data.height),
      id: data.id,
      sex: data.sex,
    });
  }, [data, reset]);

  return { control, onSubmit };
};

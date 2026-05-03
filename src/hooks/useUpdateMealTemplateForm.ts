import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import {
  mealTemplateSchema,
  useMealTemplate,
  useUpdateMealTemplate,
} from "../queries/meal-templates";

export const useUpdateMealTemplateForm = (id: number) => {
  const { data } = useMealTemplate(id);
  const { mutateAsync } = useUpdateMealTemplate();
  const { control, handleSubmit, reset } =
    useForm<z.infer<typeof mealTemplateSchema>>();
  const router = useRouter();

  useEffect(() => {
    if (!data) return;

    reset(data);
  }, [data, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    const { data, success } = mealTemplateSchema.safeParse(formData);

    if (!success) return;

    await mutateAsync(data).then(router.back);
  });

  return { control, onSubmit };
};

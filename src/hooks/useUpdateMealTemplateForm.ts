import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  mealTemplateSchema,
  useMealTemplate,
  useUpdateMealTemplate,
} from "../queries/meal-templates";
import { formatNumber, toNumber } from "../utils/number";

export const useUpdateMealTemplateForm = (id: number) => {
  const { data } = useMealTemplate(id);
  const { mutate } = useUpdateMealTemplate();
  const { control, handleSubmit, reset } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit((formData) => {
    const { data, success } = mealTemplateSchema.safeParse({
      calories: toNumber(formData.calories),
      carbs: toNumber(formData.carbs),
      fat: toNumber(formData.fat),
      id: id,
      name: formData.name,
      protein: toNumber(formData.protein),
    });

    if (!success) return;

    mutate(data);
    router.back();
  });

  useEffect(() => {
    if (!data) return;

    reset({
      calories: formatNumber(data.calories),
      carbs: formatNumber(data.carbs),
      fat: formatNumber(data.fat),
      name: data.name,
      protein: formatNumber(data.protein),
    });
  }, [data, reset]);

  return { control, onSubmit };
};

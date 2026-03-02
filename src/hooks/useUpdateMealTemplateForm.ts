import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import {
  useMealTemplate,
  useUpdateMealTemplate,
} from "../queries/meal-templates";
import { mealTemplateFormSchema } from "../schemas/meal-templates";

export const useUpdateMealTemplateForm = (id: number) => {
  const router = useRouter();
  const { mutateAsync } = useUpdateMealTemplate();
  const { data } = useMealTemplate(id);
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(mealTemplateFormSchema),
  });

  useEffect(() => {
    if (!data) return;

    reset({
      calories: data.calories.toString(),
      carbs: data.carbs.toString(),
      fat: data.fat.toString(),
      name: data.name,
      protein: data.protein.toString(),
    });
  }, [data, reset]);

  const onSubmit = handleSubmit(
    async (data: z.infer<typeof mealTemplateFormSchema>) => {
      await mutateAsync({ id, ...data });
      router.back();
    },
  );

  return { control, onSubmit };
};

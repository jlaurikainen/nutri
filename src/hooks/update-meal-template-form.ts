import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import type z from "zod";
import {
  useMealTemplate,
  useUpdateMealTemplate,
} from "../queries/meal-templates";
import { mealTemplateSchema } from "../schemas/meal-template-forms";

export const useUpdateMealTemplateForm = (id: number) => {
  const router = useRouter();
  const { mutateAsync } = useUpdateMealTemplate();
  const { data } = useMealTemplate(id);
  const { control, handleSubmit } = useForm({
    defaultValues: data
      ? {
          calories: data.calories.toString(),
          carbs: data.carbs.toString(),
          fat: data.fat.toString(),
          name: data.name,
          protein: data.protein.toString(),
        }
      : undefined,
    resolver: zodResolver(mealTemplateSchema),
  });

  const onSubmit = handleSubmit(
    async (data: z.infer<typeof mealTemplateSchema>) => {
      await mutateAsync({ id, ...data });
      router.back();
    },
  );

  return { control, onSubmit };
};

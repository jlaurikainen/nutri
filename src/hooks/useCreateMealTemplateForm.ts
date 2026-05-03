import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import type z from "zod";
import {
  createMealTemplateSchema,
  useCreateMealTemplate,
} from "../queries/meal-templates";

export const useCreateMealTemplateForm = () => {
  const { mutateAsync } = useCreateMealTemplate();
  const { control, handleSubmit } =
    useForm<z.infer<typeof createMealTemplateSchema>>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (formData) => {
    const { data, success } = createMealTemplateSchema.safeParse({
      calories: +formData.calories,
      carbs: +formData.carbs,
      fat: +formData.fat,
      name: formData.name,
      protein: +formData.protein,
    });

    if (!success) return;

    await mutateAsync(data).then(router.back);
  });

  return { control, onSubmit };
};

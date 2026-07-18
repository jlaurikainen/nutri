import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import {
  createMealTemplateSchema,
  useCreateMealTemplate,
} from "../queries/meal-templates";
import type { MealTemplateFormType } from "../types/form";
import { toNumber } from "../utils/number";

export const useCreateMealTemplateForm = () => {
  const { mutate } = useCreateMealTemplate();
  const form = useForm<MealTemplateFormType>({
    defaultValues: {
      calories: "",
      carbs: "",
      fat: "",
      fiber: "",
      name: "",
      protein: "",
      sugar: "",
    },
  });
  const { handleSubmit } = form;
  const router = useRouter();

  const onSubmit = handleSubmit((formData) => {
    const { data, success } = createMealTemplateSchema.safeParse({
      calories: toNumber(formData.calories),
      carbs: toNumber(formData.carbs),
      fat: toNumber(formData.fat),
      fiber: toNumber(formData.fiber),
      name: formData.name,
      protein: toNumber(formData.protein),
      sugar: toNumber(formData.sugar),
    });

    if (!success) return;

    mutate(data);
    router.back();
  });

  return { form, onSubmit };
};

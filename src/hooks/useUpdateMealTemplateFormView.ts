import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import {
  type MealTemplate,
  mealTemplateSchema,
  useDeleteMealTemplate,
  useUpdateMealTemplate,
} from "../queries/meal-templates";
import type { MealTemplateFormType } from "../types/meal-template-form";
import { toNumber } from "../utils/number";

const templateToFormObject = (template: MealTemplate) => {
  return Object.fromEntries(
    Object.entries(template).map(([k, v]) => [k, v.toString()]),
  );
};

export const useUpdateMealTemplateFormView = (template: MealTemplate) => {
  const form = useForm<MealTemplateFormType>({
    defaultValues: templateToFormObject(template),
  });
  const { mutate: remove } = useDeleteMealTemplate();
  const { mutate: update } = useUpdateMealTemplate();
  const router = useRouter();

  const onCancel = () => {
    router.back();
  };

  const onDelete = (id: number) => {
    return () => {
      remove(id);
      router.back();
    };
  };

  const onSubmit = form.handleSubmit((formData) => {
    const { data, success } = mealTemplateSchema.safeParse({
      calories: toNumber(formData.calories),
      carbs: toNumber(formData.carbs),
      fat: toNumber(formData.fat),
      fiber: toNumber(formData.fiber),
      id: template.id,
      name: formData.name,
      protein: toNumber(formData.protein),
      sugar: toNumber(formData.sugar),
    });

    if (!success) return;

    update(data);
    router.back();
  });

  return { form, onCancel, onDelete, onSubmit };
};

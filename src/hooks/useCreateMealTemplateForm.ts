import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import {
  createMealTemplateSchema,
  useCreateMealTemplate,
} from "../queries/meal-templates";
import { toNumber } from "../utils/number";

export const useCreateMealTemplateForm = () => {
  const { mutate } = useCreateMealTemplate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      calories: "",
      carbs: "",
      fat: "",
      name: "",
      protein: "",
    },
  });
  const router = useRouter();

  const onSubmit = handleSubmit((formData) => {
    const { data, success } = createMealTemplateSchema.safeParse({
      calories: toNumber(formData.calories),
      carbs: toNumber(formData.carbs),
      fat: toNumber(formData.fat),
      name: formData.name,
      protein: toNumber(formData.protein),
    });

    if (!success) return;

    mutate(data);
    router.back();
  });

  return { control, onSubmit };
};

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import type z from "zod";
import {
  mealTemplateFormSchema,
  useCreateMealTemplate,
} from "../queries/meal-templates";

export const useCreateMealTemplateForm = () => {
  const router = useRouter();
  const { mutateAsync } = useCreateMealTemplate();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(mealTemplateFormSchema),
  });

  const onSubmit = handleSubmit(
    async (data: z.infer<typeof mealTemplateFormSchema>) => {
      await mutateAsync(data);
      router.back();
    },
  );

  return { control, onSubmit };
};

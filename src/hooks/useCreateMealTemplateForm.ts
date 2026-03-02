import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import type z from "zod";
import { useCreateMealTemplate } from "../queries/meal-templates";
import { mealTemplateSchema } from "../schemas/meal-templates";

export const useCreateMealTemplateForm = () => {
  const router = useRouter();
  const { mutateAsync } = useCreateMealTemplate();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(mealTemplateSchema),
  });

  const onSubmit = handleSubmit(
    async (data: z.infer<typeof mealTemplateSchema>) => {
      await mutateAsync(data);
      router.back();
    },
  );

  return { control, onSubmit };
};

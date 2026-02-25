import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import {
  type CreateTemplateProps,
  useCreateMealTemplate,
} from "../queries/meal-templates";
import { toNumber } from "../utils/number";
import { Page } from "./page";
import { Button } from "./ui/button";
import { Field } from "./ui/field";
import { Text } from "./ui/text";

const FORM_SCHEMA = z.object({
  calories: z.string().transform(toNumber),
  carbs: z.string().transform(toNumber),
  fat: z.string().transform(toNumber),
  name: z.string(),
  protein: z.string().transform(toNumber),
});

export const MealTemplateForm = () => {
  const nav = useNavigation();
  const { mutateAsync } = useCreateMealTemplate();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(FORM_SCHEMA),
  });

  const onSubmit = async (data: CreateTemplateProps) => {
    await mutateAsync(data);
    nav.goBack();
  };

  return (
    <Page>
      <Controller
        control={control}
        name="name"
        render={({ field: { onBlur, onChange, ref, value } }) => (
          <Field
            autoFocus
            label="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            ref={ref}
            returnKeyType="next"
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="calories"
        render={({ field: { onBlur, onChange, ref, value } }) => (
          <Field
            inputMode="decimal"
            label="Calories"
            onBlur={onBlur}
            onChangeText={onChange}
            ref={ref}
            returnKeyType="next"
            value={value?.toString()}
          />
        )}
      />
      <Controller
        control={control}
        name="carbs"
        render={({ field: { onBlur, onChange, ref, value } }) => (
          <Field
            inputMode="decimal"
            label="Carbs"
            onBlur={onBlur}
            onChangeText={onChange}
            ref={ref}
            returnKeyType="next"
            value={value?.toString()}
          />
        )}
      />

      <Controller
        control={control}
        name="protein"
        render={({ field: { onBlur, onChange, ref, value } }) => (
          <Field
            inputMode="decimal"
            label="Protein"
            onBlur={onBlur}
            onChangeText={onChange}
            ref={ref}
            returnKeyType="next"
            value={value?.toString()}
          />
        )}
      />

      <Controller
        control={control}
        name="fat"
        render={({ field: { onBlur, onChange, ref, value } }) => (
          <Field
            inputMode="decimal"
            label="Fat"
            onBlur={onBlur}
            onChangeText={onChange}
            ref={ref}
            value={value?.toString()}
          />
        )}
      />

      <Button onPress={handleSubmit(onSubmit)}>
        <Text>Create Template</Text>
      </Button>
    </Page>
  );
};

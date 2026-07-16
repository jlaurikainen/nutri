import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import type { MealTemplateFormType } from "@/src/types/meal-template-form";
import { Field } from "../shared/field";

export const MealTemplateForm = () => {
  const { control } = useFormContext<MealTemplateFormType>();

  return (
    <View className="mb-4 gap-2">
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Field label="Name" returnKeyType="next" {...field} />
        )}
      />

      <Controller
        control={control}
        name="calories"
        render={({ field }) => (
          <Field
            inputMode="decimal"
            label="Calories"
            returnKeyType="next"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="carbs"
        render={({ field }) => (
          <Field
            inputMode="decimal"
            label="Carbs"
            returnKeyType="next"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="sugar"
        render={({ field }) => (
          <Field
            inputMode="decimal"
            label="Sugar"
            returnKeyType="next"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="protein"
        render={({ field }) => (
          <Field
            inputMode="decimal"
            label="Protein"
            returnKeyType="next"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="fat"
        render={({ field }) => (
          <Field
            inputMode="decimal"
            label="Fat"
            returnKeyType="next"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="fiber"
        render={({ field }) => (
          <Field inputMode="decimal" label="Fiber" {...field} />
        )}
      />
    </View>
  );
};

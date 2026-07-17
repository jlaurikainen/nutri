import { Stack, useRouter } from "expo-router";
import { Trash } from "lucide-react-native";
import { Fragment } from "react";
import { FormProvider } from "react-hook-form";
import { MealTemplateForm } from "@/src/components/meal-templates/meal-template-form";
import { Button } from "@/src/components/shared/button";
import { Icon } from "@/src/components/shared/icon";
import { useParsedLocalParams } from "@/src/hooks/useParsedLocalParams";
import { useUpdateMealTemplateForm } from "@/src/hooks/useUpdateMealTemplateForm";
import { useDeleteMealTemplate } from "@/src/queries/meal-templates";
import { toNumber } from "@/src/utils/number";
import { pathIdSchema } from "@/src/utils/search-params";

const Edit = () => {
  const { id } = useParsedLocalParams(pathIdSchema);
  const { form, onSubmit } = useUpdateMealTemplateForm(toNumber(id));
  const { mutate } = useDeleteMealTemplate();
  const router = useRouter();

  const onCancel = () => {
    router.back();
  };

  const onDelete = (id: number) => {
    return () => {
      mutate(id);
      router.back();
    };
  };

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerRight: () => {
            return (
              <Button
                onPress={onDelete(Number(id))}
                size="icon"
                variant="bordered"
              >
                <Icon as={Trash} />
              </Button>
            );
          },
          title: "Edit Template",
        }}
      />

      <FormProvider {...form}>
        <MealTemplateForm onCancel={onCancel} onSubmit={onSubmit} />
      </FormProvider>
    </Fragment>
  );
};

export default Edit;

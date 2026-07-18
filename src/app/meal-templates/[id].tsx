import { Stack } from "expo-router";
import { Trash } from "lucide-react-native";
import { Fragment } from "react";
import { FormProvider } from "react-hook-form";
import { MealTemplateForm } from "@/src/components/meal-templates/meal-template-form";
import { Button } from "@/src/components/shared/button";
import { Icon } from "@/src/components/shared/icon";
import { useParsedLocalParams } from "@/src/hooks/useParsedLocalParams";
import { useUpdateMealTemplateFormView } from "@/src/hooks/useUpdateMealTemplateFormView";
import {
  type MealTemplate,
  useMealTemplate,
} from "@/src/queries/meal-templates";
import { pathIdSchema } from "@/src/utils/search-params";

const Edit = () => {
  const { id } = useParsedLocalParams(pathIdSchema);
  const { data } = useMealTemplate(id);

  if (data === undefined) return null;

  return <EditView template={data} />;
};

interface EditProps {
  template: MealTemplate;
}

const EditView = ({ template }: EditProps) => {
  const { form, onCancel, onDelete, onSubmit } =
    useUpdateMealTemplateFormView(template);

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerRight: () => {
            return (
              <Button
                onPress={onDelete(template.id)}
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

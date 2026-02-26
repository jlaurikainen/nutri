import type { ControllerRenderProps, FieldValues } from "react-hook-form";

export const tranformFieldProps = <T extends FieldValues>(
  props: ControllerRenderProps<T>,
) => {
  const { onBlur, onChange, ref, value } = props;

  return {
    onBlur,
    onChangeText: onChange,
    ref,
    value: typeof value === "number" ? value?.toString() : value,
  };
};

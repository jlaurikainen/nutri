import { TextInput, type TextInputProps } from "react-native";
import { cn } from "@/src/utils/utils";

export interface InputProps
  extends Omit<TextInputProps, "onChange" | "onChange" | "value"> {
  onChange?: (text: string | number) => void;
  value?: string | number;
}

export function Input(props: InputProps) {
  const { className, onChange, value, ...rest } = props;

  const internalOnChange = (x: string) => {
    return onChange?.(typeof value === "number" ? Number(x) : x);
  };

  return (
    <TextInput
      className={cn(
        "flex h-10 w-full min-w-0 flex-row items-center border border-foreground bg-background px-3 py-1 font-grotesk text-base text-foreground leading-5 sm:h-9",
        rest.editable === false && cn("opacity-50"),
        className,
      )}
      onChangeText={internalOnChange}
      placeholderTextColor="#7e7f7c"
      value={typeof value === "number" ? value.toString() : value}
      {...rest}
    />
  );
}

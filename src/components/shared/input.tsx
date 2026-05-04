import { TextInput, type TextInputProps } from "react-native";
import { cn } from "@/src/utils/utils";

export interface InputProps extends Omit<TextInputProps, "onChange"> {
  onChange?: (text: string) => void;
}

export function Input(props: InputProps) {
  const { className, onChange, ...rest } = props;

  return (
    <TextInput
      className={cn(
        "flex h-10 w-full min-w-0 flex-row items-center border border-foreground bg-background px-3 py-1 font-grotesk text-base text-foreground leading-5 sm:h-9",
        rest.editable === false && cn("opacity-50"),
        className,
      )}
      onChangeText={onChange}
      placeholderTextColor="#7e7f7c"
      {...rest}
    />
  );
}

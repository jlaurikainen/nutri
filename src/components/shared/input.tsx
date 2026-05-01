import { TextInput, type TextInputProps } from "react-native";
import { cn } from "@/src/utils/utils";

interface Props extends Omit<TextInputProps, "onChange" | "onChange"> {
  onChange?: (text: string) => void;
}

export function Input(props: Props) {
  const { className, onChange, ...rest } = props;

  return (
    <TextInput
      className={cn(
        "border-foreground bg-background text-foreground flex h-10 w-full min-w-0 flex-row items-center border px-3 py-1 text-base leading-5 sm:h-9 font-grotesk",
        rest.editable === false && cn("opacity-50"),
        className,
      )}
      onChangeText={onChange}
      placeholderTextColor="#7e7f7c"
      {...rest}
    />
  );
}

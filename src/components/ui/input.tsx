import { TextInput, type TextInputProps } from "react-native";
import { cn } from "@/src/lib/utils";

export function Input(props: TextInputProps) {
  const { className, ...rest } = props;

  return (
    <TextInput
      className={cn(
        "border-foreground bg-background text-foreground flex h-10 w-full min-w-0 flex-row items-center border px-3 py-1 text-base leading-5 sm:h-9 font-grotesk",
        rest.editable === false && cn("opacity-50"),
        className,
      )}
      placeholderTextColor="#7e7f7c"
      {...rest}
    />
  );
}

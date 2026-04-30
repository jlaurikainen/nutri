import { TextInput, type TextInputProps } from "react-native";
import { cn } from "@/src/lib/utils";

export function Input(props: TextInputProps) {
  const { className, ...rest } = props;

  return (
    <TextInput
      className={cn(
        "border-gray-900 bg-gray-100 text-gray-900 flex h-10 w-full min-w-0 flex-row items-center border px-3 py-1 text-base leading-5 shadow-sm shadow-black/5 sm:h-9 placeholder:text-gray-500",
        rest.editable === false && cn("opacity-50"),
        className,
      )}
      {...rest}
    />
  );
}

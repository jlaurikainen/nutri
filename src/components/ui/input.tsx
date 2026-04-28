import { Platform, TextInput, type TextInputProps } from "react-native";
import { cn } from "@/src/lib/utils";

interface Props extends TextInputProps {}

export function Input(props: Props) {
  const { className, ...rest } = props;

  return (
    <TextInput
      className={cn(
        "border-input bg-white text-gray-900 flex h-10 w-full min-w-0 flex-row items-center rounded-md border px-3 py-1 text-base leading-5 shadow-sm shadow-black/5 sm:h-9 placeholder:text-gray-400",
        rest.editable === false && cn("opacity-50"),
        Platform.select({
          native: "placeholder:text-gray-400",
        }),
        className,
      )}
      {...rest}
    />
  );
}

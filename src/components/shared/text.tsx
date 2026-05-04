import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps, createContext, useContext } from "react";
import { Text as RNText } from "react-native";
import { cn } from "@/src/utils/utils";

const textVariants = cva(cn("font-grotesk text-base text-foreground"), {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      default: "",
      h1: cn("text-center font-extrabold text-4xl tracking-tight"),
      h2: cn(
        "border-border border-b pb-2 font-semibold text-3xl tracking-tight",
      ),
      h3: cn("font-semibold text-2xl tracking-tight"),
      h4: cn("font-semibold text-xl tracking-tight"),
      p: cn("mt-3 leading-7 sm:mt-6"),
    },
  },
});

type TextVariant = NonNullable<VariantProps<typeof textVariants>["variant"]>;

export const TextClassContext = createContext<string | undefined>(undefined);

interface Props extends ComponentProps<typeof RNText> {
  variant?: TextVariant;
}

export function Text(props: Props) {
  const { className, variant = "default", ...rest } = props;

  const isHeading = ["h1", "h2", "h3", "h4"].includes(variant);
  const textClass = useContext(TextClassContext);

  return (
    <RNText
      aria-level={isHeading ? variant.at(-1) : undefined}
      className={cn(textVariants({ variant }), textClass, className)}
      role={isHeading ? "heading" : undefined}
      {...rest}
    />
  );
}

import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps, createContext, useContext } from "react";
import { Text as RNText } from "react-native";
import { cn } from "@/src/lib/utils";

const textVariants = cva(cn("text-foreground text-base font-grotesk"), {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      default: "",
      h1: cn("text-center text-4xl font-extrabold tracking-tight"),
      h2: cn(
        "border-border border-b pb-2 text-3xl font-semibold tracking-tight",
      ),
      h3: cn("text-2xl font-semibold tracking-tight"),
      h4: cn("text-xl font-semibold tracking-tight"),
      p: "mt-3 leading-7 sm:mt-6",
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

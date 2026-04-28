import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { type ComponentProps, createContext } from "react";
import { Text as RNText } from "react-native";
import { cn } from "@/src/lib/utils";

const textVariants = cva(cn("text-gray-900 text-base"), {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      blockquote: "mt-4 border-l-2 pl-3 italic sm:mt-6 sm:pl-6",
      code: cn(
        "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      ),
      default: "",
      h1: cn("text-center text-4xl font-extrabold tracking-tight"),
      h2: cn(
        "border-border border-b pb-2 text-3xl font-semibold tracking-tight",
      ),
      h3: cn("text-2xl font-semibold tracking-tight"),
      h4: cn("text-xl font-semibold tracking-tight"),
      large: "text-lg font-semibold",
      lead: "text-muted-foreground text-xl",
      muted: "text-muted-foreground text-sm",
      p: "mt-3 leading-7 sm:mt-6",
      small: "text-sm font-medium leading-none",
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
  const textClass = React.useContext(TextClassContext);

  return (
    <RNText
      aria-level={isHeading ? variant.at(-1) : undefined}
      className={cn(textVariants({ variant }), textClass, className)}
      role={isHeading ? "heading" : undefined}
      {...rest}
    />
  );
}

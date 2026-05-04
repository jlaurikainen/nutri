import { cva, type VariantProps } from "class-variance-authority";
import { Pressable } from "react-native";
import { TextClassContext } from "@/src/components/shared/text";
import { cn } from "@/src/utils/utils";

const buttonVariants = cva(
  cn("group shrink-0 flex-row items-center justify-center gap-2 shadow-none"),
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: cn("h-10 px-4 py-2 sm:h-9"),
        icon: "h-10 w-10 sm:h-9 sm:w-9",
        lg: cn("h-11 px-6 sm:h-10"),
        sm: cn("h-9 gap-1.5 px-3 sm:h-8"),
      },
      variant: {
        bordered: cn(
          "border border-foreground bg-background active:bg-light-gray/5",
        ),
        brand: cn("bg-brand active:bg-brand/90"),
        default: cn("bg-foreground active:bg-foreground/90"),
        selectable: cn(
          "border border-mid-gray bg-mid-gray active:bg-mid-gray/90",
        ),
      },
    },
  },
);

const buttonTextVariants = cva(cn("font-grotesk"), {
  defaultVariants: {
    size: "default",
    variant: "default",
  },
  variants: {
    size: {
      default: "",
      icon: "",
      lg: "",
      sm: "",
    },
    variant: {
      bordered: cn("text-foreground"),
      brand: cn("text-background"),
      default: cn("text-background"),
      selectable: cn("text-background"),
    },
  },
});

interface ButtonProps
  extends React.ComponentProps<typeof Pressable>,
    VariantProps<typeof buttonVariants> {}

export function Button(props: ButtonProps) {
  const { className, size = "default", variant = "default", ...rest } = props;

  return (
    <TextClassContext.Provider value={buttonTextVariants({ size, variant })}>
      <Pressable
        className={cn(
          rest.disabled && "opacity-50",
          buttonVariants({ size, variant }),
          className,
        )}
        role="button"
        {...rest}
      />
    </TextClassContext.Provider>
  );
}

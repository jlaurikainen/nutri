import { cva, type VariantProps } from "class-variance-authority";
import { Pressable } from "react-native";
import { TextClassContext } from "@/src/components/ui/text";
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
        default: cn("bg-foreground active:bg-foreground/90"),
        destructive: cn("bg-brand active:bg-brand/90"),
        secondary: cn(
          "bg-light-gray/10 border border-foreground active:bg-light-gray/5",
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
      default: cn("text-background"),
      destructive: cn("text-background"),
      secondary: cn("text-foreground"),
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

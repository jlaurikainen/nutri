import type { LucideIcon, LucideProps } from "lucide-react-native";
import { withUniwind } from "uniwind";
import { cn } from "@/src/utils/utils";

type IconProps = LucideProps & {
  as: LucideIcon;
};

function IconImpl({ as: IconComponent, ...rest }: IconProps) {
  return <IconComponent {...rest} />;
}

const StyledIcon = withUniwind(IconImpl, {
  color: {
    fromClassName: "className",
    styleProperty: "color",
  },
  size: {
    fromClassName: "className",
    styleProperty: "width",
  },
});

export function Icon({ as: IconComponent, className, ...rest }: IconProps) {
  return (
    <StyledIcon
      as={IconComponent}
      className={cn("size-5", className)}
      {...rest}
    />
  );
}

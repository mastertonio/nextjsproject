import { Button, ButtonVariant, MantineColor, MantineGradient } from "@mantine/core";

interface IButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    variant?: ButtonVariant // filled, light, default, outline, subtle
    color?: MantineColor //dark, lime, green, gray, pink, grape, violet, indigo, cyan, teal, yellow, orange
    gradient?: MantineGradient // sample: gradient={{ from: 'teal', to: 'lime', deg: 105 }}
    size?: string,
    disabled?: boolean;
    style?: string;
  }

const DefaultButton: React.FC<IButtonProps> = ({
    children,
    onClick,
    variant,
    size,
    disabled,
    style,
    gradient,
    ...rest
}) => {
  return (
    <Button
      size="xs"
      onClick={onClick}
      disabled={disabled}
      variant={variant ? variant : "default"}
      className={style}
      gradient={gradient}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default DefaultButton;

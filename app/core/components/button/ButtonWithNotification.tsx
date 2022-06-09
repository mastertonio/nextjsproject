import { Button, MantineColor } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IButtonProps } from "./Button";

const DefaultButton: React.FC<IButtonProps> = ({
  children,
  onClick,
  variant,
  size,
  disabled,
  style,
  gradient,
  notif,
  ...rest
}) => {
  const handleClick = () => {
    onClick();
    showNotification({
      title: notif ? notif.title  : "You clicked Open button",
      message: notif ? notif.message  :  "Hey there, your code is awesome! 🤥",
      autoClose: notif ? notif.autoclose  : 1000,
      disallowClose: notif ? notif.disallowClose : true,
      color: notif ? notif.color : "blue",
    });
  };

  return (
    <Button
      size="xs"
      onClick={handleClick}
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

import { ButtonHTMLAttributes, Ref, forwardRef, useId } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'medium' | 'small';
  color?: 'primary' | 'secondary' | 'normal';
}

const Button = forwardRef((props: Props, forwardRef: Ref<HTMLButtonElement>) => {
  const { size = 'medium', color = 'primary', children, ...rest } = props;
  const buttonId = useId();

  const BUTTON_COLOR = {
    primary: 'bg-[#567BFF]',
    secondary: 'bg-[#92aafd]',
    normal: 'bg-[#E9EAF4]',
  };

  const BUTTON_SIZE = {
    medium: 'h-[50px]',
    small: 'h-10',
  };

  return (
    <button
      className={`w-full rounded-lg outline-none ${BUTTON_SIZE[size]} ${BUTTON_COLOR[color]}`}
      ref={forwardRef}
      id={buttonId}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;

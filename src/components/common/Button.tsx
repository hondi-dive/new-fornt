import { ButtonHTMLAttributes, Ref, forwardRef } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'medium' | 'small';
  color?: 'primary' | 'secondary' | 'selected' | 'normal';
}

const Button = forwardRef((props: Props, forwardRef: Ref<HTMLButtonElement>) => {
  const { size = 'medium', color = 'primary', children, ...rest } = props;

  const BUTTON_COLOR = {
    primary: 'bg-[#567BFF] border-solid border-[1px] border-[#567BFF]',
    secondary: 'bg-[#92aafd] border-solid border-[1px] border-[#92aafd]',
    selected: 'bg-[#E9EAF4] border-solid border-[1px] border-[#E9EAF4]',
    normal: 'bg-white border-solid border-[1px] border-[#92aafd]',
  };

  const BUTTON_SIZE = {
    medium: 'h-[50px]',
    small: 'h-10',
  };

  return (
    <button
      className={`w-full rounded-lg outline-none ${BUTTON_SIZE[size]} ${BUTTON_COLOR[color]}`}
      ref={forwardRef}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;

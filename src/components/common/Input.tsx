import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  _size?: 'medium' | 'small';
}

export default function Input({ _size = 'medium', ...rest }: Props) {
  const INPUT_SIZE = {
    medium: 'h-[50px]',
    small: 'h-10',
  };

  return (
    <input
      className={`w-full outline-none px-[18px] rounded-lg bg-transparent ${INPUT_SIZE[_size]} no-spin-button`}
      {...rest}
    />
  );
}

import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  _size?: 'medium' | 'small';
  unit?: string;
}

export default function Input({ _size = 'medium', unit, ...rest }: Props) {
  const INPUT_SIZE = {
    medium: 'h-[50px]',
    small: 'h-10',
  };

  return (
    <div
      className={`flex justify-between items-center px-[18px] rounded-lg ${
        rest.disabled ? 'bg-[#e9eaf4]' : 'border-solid border-[1px] border-[rgb(165,165,165)]'
      } ${INPUT_SIZE[_size]}`}
    >
      <input
        className=" w-full outline-none disabled:bg-transparent text-right text-sm"
        {...rest}
      />
      {unit && (
        <span
          className={`font-medium ml-1 text-sm ${rest.disabled ? 'text-black' : 'text-[#a5a5a5]'}`}
        >
          {unit}
        </span>
      )}
    </div>
  );
}

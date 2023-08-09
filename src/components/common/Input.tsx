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
      className={`flex justify-between items-center px-[18px] rounded-lg border-solid border-[1px] border-[rgb(165,165,165)] ${INPUT_SIZE[_size]}`}
    >
      <input className=" w-full outline-none" {...rest} />
      {unit && <span className="font-medium ml-2 text-[#a5a5a5] text-sm">{unit}</span>}
    </div>
  );
}

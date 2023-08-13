import Input from '@/components/common/Input';
import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  _size?: 'medium' | 'small';
  unit: string;
}

export default function InputWithUnit({ unit, _size = 'medium', ...rest }: Props) {
  return (
    <div
      className={`flex justify-between items-center pr-[18px] rounded-lg ${
        rest.disabled ? 'bg-[#e9eaf4]' : 'border-solid border-[1px] border-[rgb(165,165,165)]'
      }`}
    >
      <Input _size={_size} style={{ textAlign: 'right' }} {...rest} />
      {unit && (
        <span
          className={`font-medium -ml-6 text-sm ${rest.disabled ? 'text-black' : 'text-[#a5a5a5]'}`}
        >
          {unit}
        </span>
      )}
    </div>
  );
}

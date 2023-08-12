'use client';

import { useEffect, useState } from 'react';

import Heart from '@/assets/icons/Heart';

interface Props {
  size?: 'medium' | 'small';
  value?: number;
}

export default function Satisfaction({ size = 'medium', value }: Props) {
  const [satisfaction, setSatisfaction] = useState(0);

  useEffect(() => {
    if (!!value) {
      setSatisfaction(value);
    }
  }, [value]);

  const handleClick = (value: number) => {
    setSatisfaction((prev) => {
      if (prev === value) {
        return 0;
      } else {
        return value;
      }
    });
  };

  return (
    <div className={` flex items-center  justify-center ${size === 'medium' && 'gap-2'}`}>
      {Array.from({ length: 5 }, (_, i) => {
        if (satisfaction >= i + 1) {
          return (
            <button key={i} onClick={!value ? () => handleClick(i + 1) : undefined}>
              <Heart isFill={true} size={size === 'medium' ? 33 : 20} />
            </button>
          );
        } else {
          return (
            <button key={i} onClick={!value ? () => handleClick(i + 1) : undefined}>
              <Heart size={size === 'medium' ? 33 : 20} />
            </button>
          );
        }
      })}
    </div>
  );
}

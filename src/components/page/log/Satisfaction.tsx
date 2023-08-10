import { useState } from 'react';
import Heart from '@/assets/icons/Heart';

export default function Satisfaction() {
  const [satisfaction, setSatisfaction] = useState(0);

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
    <div className="relative h-[50px] flex items-center w-full border-[1px] border-[#d9d9d9] border-solid rounded-lg justify-center gap-2">
      {Array.from({ length: 5 }, (_, i) => {
        if (satisfaction >= i + 1) {
          return (
            <button key={i} onClick={() => handleClick(i + 1)}>
              <Heart isFill={true} />
            </button>
          );
        } else {
          return (
            <button key={i} onClick={() => handleClick(i + 1)}>
              <Heart />
            </button>
          );
        }
      })}
    </div>
  );
}

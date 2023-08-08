import { useState } from 'react';
import HeartEmpty from '@/assets/icons/heartEmpty.svg';
import HeartFill from '@/assets/icons/heartFill.svg';

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
              <HeartFill />
            </button>
          );
        } else {
          return (
            <button key={i} onClick={() => handleClick(i + 1)}>
              <HeartEmpty />
            </button>
          );
        }
      })}
    </div>
  );
}

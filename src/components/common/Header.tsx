import CaretLeftIcon from '@/assets/icons/CaretLeft.svg';

interface Props {
  onBackClick?: () => void;
  onNextClick?: () => void;
  title: string;
}

export default function Header({ onBackClick, onNextClick, title }: Props) {
  return (
    <header className="flex justify-between items-center h-16 px-6 shadow-[0_0_12px_3px_rgba(56,56,56,0.1)] fixed max-w-[393px] w-full">
      <div>
        {onBackClick && (
          <button onClick={onBackClick}>
            <CaretLeftIcon />
          </button>
        )}
      </div>

      <span className="text-[17px]">{title}</span>

      <div>
        {onNextClick && (
          <button onClick={onNextClick}>
            <span className="text-[#426BFF] text-lg font-semibold">다음</span>
          </button>
        )}
      </div>
    </header>
  );
}

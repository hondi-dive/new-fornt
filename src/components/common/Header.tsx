import CaretLeftIcon from '@/assets/icons/CaretLeft.svg';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface Props {
  backComponents?: JSX.Element;
  nextComponents?: JSX.Element;
  title: string;
}

const Header = ({ title, backComponents, nextComponents }: Props) => {
  return (
    <header className="flex justify-between items-center h-16 px-6 shadow-[0_0_12px_3px_rgba(56,56,56,0.1)]">
      <div className=" w-10 flex justify-start">{backComponents && backComponents}</div>

      <span className="text-[17px]">{title}</span>

      <div className="w-10 flex justify-end">{nextComponents && nextComponents}</div>
    </header>
  );
};

interface HeaderNextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onNextClick: () => void;
}

const HeaderNext = ({ children, onNextClick, ...rest }: PropsWithChildren<HeaderNextProps>) => {
  return (
    <button
      className="text-[#426BFF] text-lg font-semibold disabled:text-[#d9d9d9]"
      onClick={onNextClick}
      {...rest}
    >
      {children}
    </button>
  );
};
HeaderNext.displayName = 'Header.Next';
Header.Next = HeaderNext;

const HeaderBack = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button onClick={handleBack}>
      <CaretLeftIcon />
    </button>
  );
};
HeaderBack.displayName = 'Header.Back';
Header.Back = HeaderBack;

export default Header;

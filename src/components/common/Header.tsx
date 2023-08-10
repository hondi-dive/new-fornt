'use client';
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
    <header className="flex fixed top-0 left-0 w-full max-w-[393px] justify-between items-center h-16 px-6 border-b-[#d9d9d9] border-solid border-b-[1px] bg-white">
      <div className=" w-10 flex justify-start">{backComponents && backComponents}</div>

      <span className="text-[17px]">{title}</span>

      <div className="w-10 flex justify-end">{nextComponents && nextComponents}</div>
    </header>
  );
};

interface HeaderNextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  path?: string;
  onNextClick?: () => void;
}

const HeaderNext = ({
  children,
  path,
  onNextClick,
  ...rest
}: PropsWithChildren<HeaderNextProps>) => {
  const router = useRouter();

  const handleNext = () => {
    if (!!path) router.push(path);
    if (!!onNextClick) onNextClick();
  };

  return (
    <button
      className="text-[#426BFF] text-lg font-semibold disabled:text-[#d9d9d9]"
      onClick={handleNext}
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

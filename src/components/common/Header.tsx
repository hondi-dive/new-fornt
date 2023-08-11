'use client';
import CaretLeftIcon from '@/assets/icons/CaretLeft.svg';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface Props {
  backComponent?: JSX.Element;
  nextComponent?: JSX.Element;
  title: string;
}

const Header = ({ title, backComponent, nextComponent }: Props) => {
  return (
    <header className="flex fixed top-0 w-full max-w-[393px] justify-between items-center h-16 px-6 border-b-[#d9d9d9] border-solid border-b-[1px] bg-white z-50">
      <div className=" w-10 flex justify-start">{backComponent && backComponent}</div>
      <span className="text-[17px]">{title}</span>
      <div className="w-10 flex justify-end">{nextComponent && nextComponent}</div>
    </header>
  );
};

interface HeaderNextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  path: string;
}

const HeaderNext = ({ children, path, ...rest }: PropsWithChildren<HeaderNextProps>) => {
  const router = useRouter();

  const handleNext = () => {
    router.push(path);
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

interface HeaderBackProps {
  path?: string;
}

const HeaderBack = ({ path }: HeaderBackProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (path) {
      router.push(path);
    } else {
      router.back();
    }
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

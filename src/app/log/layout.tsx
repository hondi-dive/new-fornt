'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import ProgressTitle from '@/components/page/log/ProgressTitle';
import Header from '@/components/common/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNextClick = () => {
    router.push('/log/detail');
  };

  const handleRegister = () => {
    console.log('로그 등록 요청');
  };

  const getDataByPath = (pathname: string, logData: any, logDetailData: any) => {
    if (pathname === '/log') {
      return logData;
    } else if (pathname === '/log/detail') {
      return logDetailData;
    } else {
      return undefined;
    }
  };

  return (
    <div>
      <Header
        title="나의로그 작성"
        backComponents={<Header.Back />}
        nextComponents={
          <Header.Next onNextClick={getDataByPath(pathname, handleNextClick, handleRegister)}>
            <span>{getDataByPath(pathname, '다음', '등록')}</span>
          </Header.Next>
        }
      />
      <div className=" mt-16 p-6 flex flex-col gap-[42px]">
        <ProgressTitle
          currProgress={getDataByPath(pathname, 1, 2)}
          totalProgress={2}
          text={`경험을 담아서\n나만의 로그를 작성해볼까요?`}
        />
        {children}
        <div className=" h-24" />
      </div>
    </div>
  );
}

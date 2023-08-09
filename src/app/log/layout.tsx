'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ProgressTitle from '@/app/log/ProgressTitle';
import Header from '@/components/common/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleNextClick = () => {
    router.push('/log/detail');
  };

  return (
    <div>
      <Header
        title="나의로그 작성"
        onBackClick={() => router.back()}
        onNextClick={handleNextClick}
      />
      <div className=" p-6 flex flex-col gap-[42px]">
        <ProgressTitle
          currProgress={1}
          totalProgress={2}
          text={`경험을 담아서\n나만의 로그를 작성해볼까요?`}
        />
        {children}
        <div className=" h-24" />
      </div>
    </div>
  );
}

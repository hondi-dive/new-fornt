import React from 'react';

import BottomNav from '@/components/common/BottomNav';
import HeaderLayout from '@/layouts/HeaderLayout';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <HeaderLayout title="주소로 찾기" backPath="/home">
        <div className="h-screen w-full px-3">{children}</div>
      </HeaderLayout>
      <BottomNav />
    </>
  );
}

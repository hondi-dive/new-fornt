import BottomNav from '@/components/common/BottomNav';
import HeaderLayout from '@/layouts/HeaderLayout';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <HeaderLayout title="마이 페이지">
        <div>{children}</div>
      </HeaderLayout>
      <BottomNav />
    </>
  );
}

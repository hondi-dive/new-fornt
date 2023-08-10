'use client';

import { useRouter } from 'next/navigation';

import useTimeout from '@/hooks/useTimeout';
import LogoIcon from '@/assets/icons/logo.svg';

export default function Page() {
  const router = useRouter();

  useTimeout(() => {
    router.push('/home');
  }, 3000);

  return (
    <div className="pt-64 px-4 bg-[#426BFF] h-screen">
      <div className="flex  mb-48 flex-col items-center">
        <div className="text-white text-sm">물 속 정보 기록.공유 서비스</div>
        <div className="flex items-center">
          <LogoIcon />
          <span className=" ml-5 text-[80px] font-['SlowSlow'] text-white">이거바당</span>
        </div>
      </div>
    </div>
  );
}

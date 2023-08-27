'use client';

import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import useTimeout from '@/hooks/useTimeout';
import LogoIcon from '@/assets/icons/logo.svg';
import LeftHandIcon from '@/assets/icons/leftHand.svg';
import RightHandIcon from '@/assets/icons/rightHand.svg';
import PalmIcon from '@/assets/icons/palm.svg';

export default function Page() {
  const router = useRouter();

  useTimeout(() => {
    if (getCookie('access_token')) return router.push('/home');
    router.push('/login');
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
      {/* <div className="animate-[rightHand_4s_linear_infinite] z-10">
        <RightHandIcon />
      </div>
      <div className="relative flex justify-center items-center animate-[leftHand_4s_linear_infinite]">
        <LeftHandIcon />
        <div className="absolute">
          <PalmIcon />
        </div>
      </div> */}
    </div>
  );
}

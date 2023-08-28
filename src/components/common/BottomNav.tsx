import Link from 'next/link';

import HomeIcon from '@/assets/icons/home.svg';
import MyIcon from '@/assets/icons/my.svg';
import WriteIcon from '@/assets/icons/write.svg';
import ListIcon from '@/assets/icons/list.svg';

export default function BottomNav() {
  return (
    <div className="w-full h-20 px-11 flex bg-white justify-between py-3  bottom-0 z-10 fixed max-w-[393px]">
      <Link
        href="/log"
        className="absolute left-[83%] bg-[#426BFF] rounded-[50%] w-[70px] h-[70px] inline-flex justify-center items-center top-0"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <WriteIcon />
      </Link>
      <Link href="/home">
        <HomeIcon />
      </Link>
      <Link href="/feeds">
        <ListIcon />
      </Link>
      <Link href="/my">
        <MyIcon />
      </Link>
      <div className="h-8 w-8" />
    </div>
  );
}

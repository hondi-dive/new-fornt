'use client';

import Image from 'next/image';
import DumiImg from '@/assets/images/diving.png';
import ArrowCircle from '@/assets/icons/arrowCircle.svg';
import HandsClapping from '@/assets/icons/handsClapping.svg';
import HashTag from '@/components/page/feed/HashTag';
import Heart from '@/assets/icons/Heart';
import Tooltip from '@/assets/icons/Tooltip';
import Link from 'next/link';
import IdBadge from '@/components/page/feed/IdBadge';
import Satisfaction from '@/components/page/log/Satisfaction';

interface Props {
  params: { id: string };
}

export default function FeedDetail({ params }: Props) {
  return (
    <>
      <div className="relative">
        <div className="absolute left-[22px] top-[22px]">
          <IdBadge id="Cherisher_y" />
        </div>
        <Image alt="feed image" src={DumiImg} />
      </div>

      <div className="bg-white rounded-br-3xl rounded-bl-3xl px-6 py-[22px]">
        <div className="flex justify-between items-end">
          <span className="flex items-center">
            <h2 className=" text-2xl font-bold">스쿠버다이빙</h2>
            <span className=" ml-3 text-xl">
              <Satisfaction size="small" value={2} />
            </span>
          </span>
          <span className="text-[#7f7f7f] text-sm">2023.08.05</span>
        </div>

        <p className=" mt-4 text-sm max-h-screen leading-[22px]">
          쓰레기.홍합 껍데기들. 노래미들을 발견할 수 있었음 강한 조류와 나쁜 시야에 당황함. 장비 첫
          사용. *태풍 미니 큐슈 상륙
        </p>

        <div className="mt-4 flex flex-nowrap overflow-x-auto whitespace-nowrap overflow-y-hidden no-scrollbar w-full gap-2">
          <HashTag text="열대어발견" />
          <HashTag text="열대어발견" />
        </div>

        <div className="flex mt-6 mb-2 gap-7">
          <div className="flex items-center gap-1">
            <Tooltip size={22} isFill={true} />
            <span>12</span>
          </div>
          <div className="flex items-center gap-1">
            <HandsClapping />
            <span>12</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center py-5">
        <Link href={`/feed/detail/log/${params.id}`} className="flex justify-center items-center">
          <span className=" text-white text-lg mr-3">로그 기록 보러가기</span>
          <ArrowCircle />
        </Link>
      </div>
    </>
  );
}

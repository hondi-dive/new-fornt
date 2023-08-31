'use client';
import Image from 'next/image';
import HandsClapping from '@/assets/icons/handsClapping.svg';
import HashTag from '@/components/page/feed/HashTag';
import Tooltip from '@/assets/icons/Tooltip';
import IdBadge from '@/components/page/feed/IdBadge';
import Satisfaction from '@/components/page/log/Satisfaction';
import { FeedDetailType } from '@/types/feed';
import { DiveType } from '@/types/log';
import useWindowSize from '@/hooks/useWindowSize';
import { useEffect } from 'react';

interface Props {
  routeCommentPage: () => void;
  feedData: FeedDetailType;
  toggleLike: () => void;
  diveLogId: string;
  fetchFeedData: (id: string) => void;
}

export default function FeedDetailRead({
  routeCommentPage,
  feedData,
  toggleLike,
  diveLogId,
  fetchFeedData,
}: Props) {
  const windowSize = useWindowSize();

  useEffect(() => {
    fetchFeedData(diveLogId);
  }, []);

  const getDiveType = (diveType: DiveType) => {
    switch (diveType) {
      case 'SCUBA':
        return '스쿠버다이빙';
      case 'FREEDIVING':
        return '프리다이빙';
      default:
        return '스노클링';
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute left-[22px] top-[22px]">
          <IdBadge id={feedData.writer.nickName} />
        </div>
        <Image
          alt="feed image"
          src={feedData.imageUrl}
          fill={windowSize ? false : true}
          width={windowSize?.width}
          height={windowSize?.width}
        />
      </div>

      <div className="bg-white rounded-br-3xl rounded-bl-3xl px-6 py-[22px]">
        <div className="flex justify-between items-end">
          <span className="flex items-center">
            <h2 className=" text-2xl font-bold">{getDiveType(feedData.diveType)}</h2>
            <span className=" ml-3 text-xl">
              <Satisfaction size="small" value={feedData.score} />
            </span>
          </span>
          <span className="text-[#7f7f7f] text-sm">
            {feedData.diveAt.substring(0, 10).split('-').join('.')}
          </span>
        </div>

        <p className=" mt-4 text-sm max-h-screen leading-[22px]">{feedData.review}</p>

        {feedData.hashTags && (
          <div className="mt-4 flex flex-nowrap overflow-x-auto whitespace-nowrap overflow-y-hidden no-scrollbar w-full gap-2">
            {feedData.hashTags.map((tag, idx) => (
              <HashTag key={idx} text={tag} />
            ))}
          </div>
        )}

        <div className="flex mt-6 mb-2 gap-7">
          <button className="flex items-center gap-1" onClick={routeCommentPage}>
            <Tooltip size={22} isFill={true} />
            <span>{feedData.commentCnt}</span>
          </button>
          <button className="flex items-center gap-1" onClick={toggleLike}>
            <HandsClapping />
            <span>{feedData.likeCnt}</span>
          </button>
        </div>
      </div>
    </>
  );
}

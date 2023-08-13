'use client';

import ArrowCircle from '@/assets/icons/arrowCircle.svg';
import Link from 'next/link';
import FeedDetailRead from '@/components/page/feed/FeedDetailRead';
import FeedComment from '@/components/page/feed/FeedComment';
import HeaderLayout from '@/layouts/HeaderLayout';
import Share from '@/assets/icons/share.svg';
import { useState } from 'react';
import XIcon from '@/assets/icons/XIcon';

interface Props {
  params: { id: string };
}

export default function FeedDetail({ params }: Props) {
  const [pageType, setPageType] = useState<'feedDetail' | 'comment'>('feedDetail');

  const positions = [
    {
      id: 1,
      title: '판포포구',
    },
    {
      id: 2,
      title: '월령포구',
    },
    {
      id: 3,
      title: '범섬',
    },
    {
      id: 4,
      title: '황우지선녀탕',
    },
    {
      id: 5,
      title: '김녕포구',
    },
    {
      id: 6,
      title: '김녕해변',
    },
    {
      id: 7,
      title: '중문해수욕장',
    },
    {
      id: 8,
      title: '함덕해변',
    },
    {
      id: 9,
      title: '이호테우해변',
    },
    {
      id: 10,
      title: '협재해변',
    },
  ];

  const spot = positions.find((position) => position.id === Number(params.id)) ?? { title: '' };

  const handleShare = () => {
    alert('서비스 준비중 입니다.');
  };

  const routeCommentPage = () => {
    setPageType('comment');
  };

  return (
    <div className="bg-[#567BFF] h-screen">
      <HeaderLayout
        title={pageType === 'feedDetail' ? spot.title : '댓글'}
        backComponent={pageType === 'comment' ? <div /> : undefined}
        nextComponent={
          pageType === 'feedDetail' ? (
            <button onClick={handleShare}>
              <Share />
            </button>
          ) : (
            <button onClick={() => setPageType('feedDetail')}>
              <XIcon size={24} color="#000" />
            </button>
          )
        }
      >
        <div className="w-full">
          {pageType === 'feedDetail' ? (
            <FeedDetailRead routeCommentPage={routeCommentPage} />
          ) : (
            <FeedComment />
          )}

          <div className="h-[71px] file: flex justify-center items-center py-5">
            <Link
              href={`/feed/detail/log/${params.id}`}
              className="flex justify-center items-center"
            >
              <span className=" text-white text-lg mr-3">로그 기록 보러가기</span>
              <ArrowCircle />
            </Link>
          </div>
        </div>
      </HeaderLayout>
    </div>
  );
}

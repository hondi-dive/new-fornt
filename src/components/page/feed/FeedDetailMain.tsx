import FeedComment from '@/components/page/feed/FeedComment';
import FeedDetailRead from '@/components/page/feed/FeedDetailRead';
import { FeedDetailPage, FeedDetailType } from '@/types/feed';
import ArrowCircle from '@/assets/icons/arrowCircle.svg';
import { useState } from 'react';
import HeaderLayout from '@/layouts/HeaderLayout';
import Share from '@/assets/icons/share.svg';
import XIcon from '@/assets/icons/XIcon';

interface Props {
  feedData: FeedDetailType;
  routeFeedDetail: (value: FeedDetailPage) => void;
}

export default function FeedDetailMain({ feedData, routeFeedDetail }: Props) {
  const [page, setPage] = useState<'feedDetail' | 'comment'>('feedDetail');

  const handleShare = () => {
    alert('서비스 준비중 입니다.');
  };

  const routeCommentPage = () => {
    setPage('comment');
  };

  return (
    <HeaderLayout
      title={page === 'feedDetail' ? feedData.address : '댓글'}
      backComponent={page === 'comment' ? <div /> : undefined}
      nextComponent={
        page === 'feedDetail' ? (
          <button onClick={handleShare}>
            <Share />
          </button>
        ) : (
          <button onClick={() => setPage('feedDetail')}>
            <XIcon size={24} color="#000" />
          </button>
        )
      }
    >
      <div className="w-full">
        {page === 'feedDetail' ? (
          <FeedDetailRead feedData={feedData} routeCommentPage={routeCommentPage} />
        ) : (
          <FeedComment />
        )}

        <div className="h-[71px] file: flex justify-center items-center py-5">
          <button
            onClick={() => routeFeedDetail('feedDetailLog')}
            className="flex justify-center items-center"
          >
            <span className=" text-white text-lg mr-3">로그 기록 보러가기</span>
            <ArrowCircle />
          </button>
        </div>
      </div>
    </HeaderLayout>
  );
}

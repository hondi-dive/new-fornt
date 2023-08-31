import FeedComment from '@/components/page/feed/FeedComment';
import FeedDetailRead from '@/components/page/feed/FeedDetailRead';
import { FeedDetailPage, FeedDetailType } from '@/types/feed';
import ArrowCircle from '@/assets/icons/arrowCircle.svg';
import { useEffect, useState } from 'react';
import HeaderLayout from '@/layouts/HeaderLayout';
import Share from '@/assets/icons/share.svg';
import XIcon from '@/assets/icons/XIcon';
import { fetchUserDetail } from '@/apis/log';
import FeedSetting from '@/components/page/feed/FeedSetting';
import FeedShare from '@/components/page/feed/FeedShare';

interface Props {
  feedData: FeedDetailType;
  routeFeedDetail: (value: FeedDetailPage) => void;
  toggleLike: () => void;
  diveLogId: string;
  fetchFeedData: (id: string) => void;
}

export default function FeedDetailMain({
  feedData,
  routeFeedDetail,
  toggleLike,
  diveLogId,
  fetchFeedData,
}: Props) {
  const [page, setPage] = useState<'feedDetail' | 'comment'>('feedDetail');
  const [userData, setUserData] = useState({
    id: 0,
    nickName: '',
    imageUri: '',
    email: '',
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await fetchUserDetail();
      setUserData(res);
    } catch (error) {
      console.log(error);
      alert('요청중에 에러가 발생하였습니다.');
    }
  };

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
          <>
            {feedData.writer.email !== userData.email ? (
              <FeedShare feedData={feedData} />
            ) : (
              <FeedSetting diveLogId={diveLogId} feedData={feedData} />
            )}
          </>
        ) : (
          <button onClick={() => setPage('feedDetail')}>
            <XIcon size={24} color="#000" />
          </button>
        )
      }
    >
      <div className="w-full">
        {page === 'feedDetail' ? (
          <FeedDetailRead
            feedData={feedData}
            routeCommentPage={routeCommentPage}
            toggleLike={toggleLike}
            diveLogId={diveLogId}
            fetchFeedData={fetchFeedData}
          />
        ) : (
          <FeedComment diveLogId={diveLogId} />
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

'use client';
import { useEffect, useState } from 'react';
import { fetchDiveLogsDetail, fetchDiveLogsLike } from '@/apis/log';
import { FeedDetailPage, FeedDetailType } from '@/types/feed';
import FeedDetailMain from '@/components/page/feed/FeedDetailMain';
import FeedDetailLog from '@/components/page/feed/FeedDetailLog';

interface Props {
  params: { id: string };
}

export default function FeedDetail({ params }: Props) {
  const [page, setPage] = useState<FeedDetailPage>('feedDetailMain');
  const [feedData, setFeedData] = useState<FeedDetailType>({
    writer: {
      id: 0,
      nickName: '',
      imageUri: '',
      email: '',
    },
    commentCnt: 0,
    likeCnt: 0,
    address: '',
    latitude: 0,
    longitude: 0,
    imageUrl: '',
    diveType: 'SCUBA',
    score: 0,
    review: '',
    approachType: '',
    surfaceFlow: '',
    deepFlow: '',
    temp: 0,
    waterTemp: 0,
    beforeTank: 0,
    afterTank: 0,
    diveDepth: 0,
    pointDepth: 0,
    diveAt: '',
    diveTime: 0,
    decompressionTime: 0,
    distanceView: 0,
    hashTags: [],
  });

  useEffect(() => {
    fetchFeedData(params.id);
  }, [params.id]);

  const fetchFeedData = async (id: string) => {
    try {
      const res: any = await fetchDiveLogsDetail(id);
      setFeedData(res);
    } catch (error) {
      console.log(error);
      alert('서버 에러 입니다.');
    }
  };

  const routeFeedDetail = (value: FeedDetailPage) => {
    setPage(value);
  };

  const toggleLike = async () => {
    try {
      await fetchDiveLogsLike(params.id);
      fetchFeedData(params.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {page === 'feedDetailMain' ? (
        <div className="bg-[#567BFF] h-screen">
          <FeedDetailMain
            feedData={feedData}
            routeFeedDetail={routeFeedDetail}
            toggleLike={toggleLike}
          />
        </div>
      ) : (
        <FeedDetailLog feedData={feedData} routeFeedDetail={routeFeedDetail} />
      )}
    </>
  );
}

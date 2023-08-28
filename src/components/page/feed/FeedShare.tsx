import Share from '@/assets/icons/share.svg';
import { FeedDetailType } from '@/types/feed';
import Script from 'next/script';
import { memo } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

const NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

interface Props {
  feedData: FeedDetailType;
}

const FeedShare = ({ feedData }: Props) => {
  const sendShare = async () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${feedData.address} - ${
          feedData.diveType === 'SCUBA'
            ? '스쿠버다이빙'
            : feedData.diveType === 'FREEDIVING'
            ? '프리다이빙'
            : '스노클링'
        }`,
        description: feedData.review,
        imageUrl: feedData.imageUrl,
        link: {
          mobileWebUrl: 'https://hondidive.site/home',
          webUrl: 'https://hondidive.site/home',
        },
      },
      social: {
        likeCount: feedData.likeCnt,
        commentCount: feedData.commentCnt,
      },
    });
  };

  const kakaoInit = () => {
    if (!window.Kakao.isInitialized()) window.Kakao.init(NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
  };

  return (
    <>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" onLoad={kakaoInit} />
      <button onClick={sendShare}>
        <Share />
      </button>
    </>
  );
};

export default memo(FeedShare);

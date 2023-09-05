import { deleteDiveLogs, patchDiveLogs } from '@/apis/log';
import GearSix from '@/assets/icons/GearSix.svg';
import { FeedDetailType } from '@/types/feed';
import { Menu, Transition } from '@headlessui/react';
import Script from 'next/script';
import { Fragment, memo } from 'react';

interface Props {
  diveLogId: string;
  feedData: FeedDetailType;
}

const NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

const FeedSetting = ({ diveLogId, feedData }: Props) => {
  const fetchDeleteLog = async () => {
    try {
      deleteDiveLogs(diveLogId);
    } catch (error) {
      console.log(error);
      alert('로그 삭제 중 에러가 발생했습니다.');
    }
  };

  const fetchChangePublic = async () => {
    try {
      patchDiveLogs(diveLogId);
    } catch (error) {
      console.log(error);
      alert('비공개 전환중 에러가 발생했습니다.');
    }
  };

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
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            <GearSix />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-[160px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex w-[152px] items-center rounded-md px-2 py-2 text-sm`}
                    onClick={fetchDeleteLog}
                  >
                    삭제하기
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex w-[152px] items-center rounded-md px-2 py-2 text-sm`}
                    onClick={fetchChangePublic}
                  >
                    공개/비공개로 전환
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex w-[152px] items-center rounded-md px-2 py-2 text-sm`}
                    onClick={sendShare}
                  >
                    공유하기
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default memo(FeedSetting);

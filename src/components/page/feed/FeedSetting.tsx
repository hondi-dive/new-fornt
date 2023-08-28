import { fetchDiveLogsDelete, fetchTogglePublic } from '@/apis/log';
import GearSix from '@/assets/icons/GearSix.svg';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface Props {
  diveLogId: string;
}

export default function FeedSetting({ diveLogId }: Props) {
  const fetchDeleteLog = async () => {
    try {
      fetchDiveLogsDelete(diveLogId);
    } catch (error) {
      console.log(error);
      alert('로그 삭제 중 에러가 발생했습니다.');
    }
  };

  const fetchChangePublic = async () => {
    try {
      fetchTogglePublic(diveLogId);
    } catch (error) {
      console.log(error);
      alert('비공개 전환중 에러가 발생했습니다.');
    }
  };

  return (
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
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

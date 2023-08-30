import Lock from '@/assets/icons/Lock.svg';
import LockKey from '@/assets/icons/LockKey.svg';
import LockOpen from '@/assets/icons/LockOpen.svg';
import { IsPublicType, LogData } from '@/types/log';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface Props {
  currProgress: number;
  totalProgress: number;
  text: string;
  isPublic: IsPublicType;
  updateLogData: (key: keyof LogData, value: string | number | string[]) => void;
}

export default function ProgressTitle({
  currProgress,
  totalProgress,
  text,
  isPublic,
  updateLogData,
}: Props) {
  return (
    <div className="flex flex-col items-start gap-[10px] mb-4">
      <div className="bg-black h-6 px-[17px] rounded-2xl flex items-center">
        <span className="text-white">{`${currProgress}/${totalProgress}`}</span>
      </div>
      <div className="relative w-full">
        <span className=" text-2xl font-bold leading-8 whitespace-pre-wrap">{text}</span>
        <div className="absolute bottom-0 right-0">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button>
                {isPublic === -1 ? <Lock /> : isPublic === 0 ? <LockKey /> : <LockOpen />}
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
                        onClick={() => updateLogData('isPublic', 1)}
                      >
                        공개
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-blue-500 text-white' : 'text-gray-900'
                        } group flex w-[152px] items-center rounded-md px-2 py-2 text-sm`}
                        onClick={() => updateLogData('isPublic', 0)}
                      >
                        비공개
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}

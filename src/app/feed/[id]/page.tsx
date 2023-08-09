'use client';

import React, { Fragment } from 'react';
import { Tab } from '@headlessui/react';

import SearchInput from '@/components/common/SearchInput';

export default function Feed() {
  return (
    <>
      <SearchInput placeholder="#해시태그 로 검색해주세요" />
      <div className="w-full h-7" />
      <div>
        <Tab.Group>
          <Tab.List className="bg-[#E9EAF4] flex justify-between rounded-3xl py-2 px-1.5">
            {['스노쿨링', '프리다이빙', '스쿠버다이빙'].map((tab) => (
              <Tab as={Fragment} key={tab}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected
                        ? 'bg-[#567BFF] text-white rounded-2xl py-1.5 px-5'
                        : ' text-black py-1.5 px-5'
                    } text-base outline-none`}
                  >
                    {tab}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-4">
            <Tab.Panel>
              <div className="grid  gap-2 grid-cols-2 ">
                {['1', '2', '3', '4', '5', '6', '8'].map((item) => (
                  <div key={item} className="  bg-red-400 w-full  h-[168px] rounded-lg">
                    {item}
                  </div>
                ))}
                <div></div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="grid  gap-2 grid-cols-2 ">
                {['1', '2', '3', '4', '5', '6', '8'].map((item) => (
                  <div key={item} className="  bg-red-400 w-full  h-[168px] rounded-lg">
                    {item}
                  </div>
                ))}
                <div></div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="grid  gap-2 grid-cols-2 ">
                {['1', '2', '3', '4', '5', '6', '8'].map((item) => (
                  <div key={item} className="  bg-red-400 w-full  h-[168px] rounded-lg">
                    {item}
                  </div>
                ))}
                <div></div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}

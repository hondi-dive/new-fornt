'use client';

import React, { Fragment } from 'react';
import { Tab } from '@headlessui/react';

import CheckCircle from '@/assets/icons/CheckCircle.svg';

export default function Feed() {
  return (
    <>
      <div className="w-full h-8" />
      <Tab.Group>
        <Tab.List className="bg-[#E9EAF4] flex justify-between rounded-3xl py-2 px-2">
          {['스노쿨링', '프리다이빙', '스쿠버다이빙'].map((tab) => (
            <Tab as={Fragment} key={tab}>
              {({ selected }) => (
                <button
                  className={`${
                    selected
                      ? 'bg-[#567BFF] text-white'
                      : 'border-[#92AAFD] border-2 border-solid bg-white text-[#7F7F7F]'
                  } text-base outline-none flex items-center rounded-3xl py-1.5 px-4`}
                >
                  {tab}
                  <CheckCircle color={selected ? 'white' : '#7F7F7F'} />
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-8">
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
    </>
  );
}

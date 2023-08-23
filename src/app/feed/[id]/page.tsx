'use client';

import React, { Fragment } from 'react';
import { Tab } from '@headlessui/react';
import Link from 'next/link';

import CheckCircle from '@/assets/icons/CheckCircle.svg';

const TABLIST = ['스노쿨링', '프리다이빙', '스쿠버다이빙'];

export default function Feed() {
  return (
    <>
      <div className="w-full h-8" />
      <Tab.Group>
        <Tab.List className="bg-[#E9EAF4] flex justify-between rounded-3xl py-2 px-2">
          {TABLIST.map((tab) => (
            <Tab as={Fragment} key={tab}>
              {({ selected }) => (
                <button
                  className={`${
                    selected
                      ? 'bg-[#567BFF] text-white border-2 border-solid border-[#567BFF]'
                      : 'border-[#92AAFD] border-2 border-solid bg-white text-[#7F7F7F]'
                  } text-base outline-none flex items-center rounded-3xl py-1.5 px-2`}
                >
                  {tab}
                  <CheckCircle color={selected ? 'white' : '#7F7F7F'} />
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-8">
          <Tab.Panel className="pb-24">
            <div className="grid gap-3 grid-cols-2 ">
              {['1', '2', '3', '4', '5', '6', '8'].map((item) => (
                <Link key={item} href={`/feed/detail/${item}`}>
                  <div className=" bg-red-400 w-full  h-[168px] rounded-lg">{item}</div>
                </Link>
              ))}
              <div></div>
            </div>
          </Tab.Panel>
          <Tab.Panel className="pb-24">
            <div className="grid gap-3 grid-cols-2 ">
              {['1', '2', '3'].map((item) => (
                <div key={item} className="  bg-blue-400 w-full  h-[168px] rounded-lg">
                  {item}
                </div>
              ))}
              <div></div>
            </div>
          </Tab.Panel>
          <Tab.Panel className="pb-24">
            <div className="grid gap-3 grid-cols-2 ">
              {['1', '2', '3', '4', '5'].map((item) => (
                <div key={item} className="  bg-green-400 w-full  h-[168px] rounded-lg">
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

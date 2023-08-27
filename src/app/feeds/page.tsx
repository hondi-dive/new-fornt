'use client';

import React, { useState, Fragment, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import Link from 'next/link';

import CheckCircle from '@/assets/icons/CheckCircle.svg';
import Select from '@/components/common/Select';
import { fetchDiveLogsFeed } from '@/apis/feed';

const TABLIST = ['스노쿨링', '프리다이빙', '스쿠버다이빙'];
const REGIONLIST = [
  { id: 1, selectedValue: '한림읍', displayValue: '한립읍' },
  { id: 2, selectedValue: '애월읍', displayValue: '애월읍' },
  { id: 3, selectedValue: '구좌읍', displayValue: '구좌읍' },
  { id: 4, selectedValue: '조천읍', displayValue: '조천읍' },
  { id: 5, selectedValue: '한경면', displayValue: '한경면' },
  { id: 6, selectedValue: '추자면', displayValue: '추자면' },
  { id: 7, selectedValue: '우도면', displayValue: '우도면' },
  { id: 8, selectedValue: '일도1동', displayValue: '일도1동' },
  { id: 9, selectedValue: '일도2동', displayValue: '일도2동' },
  { id: 10, selectedValue: '이도1동', displayValue: '이도1동' },
  { id: 11, selectedValue: '이도2동', displayValue: '이도2동' },
  { id: 12, selectedValue: '삼도1동', displayValue: '삼도1동' },
  { id: 13, selectedValue: '삼도2동', displayValue: '삼도2동' },
  { id: 14, selectedValue: '용담1동', displayValue: '용담1동' },
  { id: 15, selectedValue: '용담2동', displayValue: '용담2동' },
  { id: 16, selectedValue: '건압동', displayValue: '건압동' },
  { id: 17, selectedValue: '화북동', displayValue: '화북동' },
  { id: 18, selectedValue: '삼양동', displayValue: '삼양동' },
  { id: 19, selectedValue: '동개동', displayValue: '동개동' },
  { id: 20, selectedValue: '아라동', displayValue: '아라동' },
  { id: 21, selectedValue: '오라동', displayValue: '오라동' },
  { id: 22, selectedValue: '연동', displayValue: '연동' },
  { id: 23, selectedValue: '노형동', displayValue: '노형동' },
  { id: 24, selectedValue: '외도동', displayValue: '외도동' },
  { id: 25, selectedValue: '이호동', displayValue: '이호동' },
  { id: 26, selectedValue: '도두동', displayValue: '도두동' },
];

const CITYLIST = [
  { id: 1, selectedValue: '제주시', displayValue: '제주시' },
  { id: 2, selectedValue: '서귀포시', displayValue: '서귀포시' },
];

export default function Feed() {
  const [city, setCity] = useState<any>(CITYLIST[0]);
  const [region, setRegion] = useState<any>(REGIONLIST[0]);

  const loadDiveLogsFeed = async () => {
    const res = await fetchDiveLogsFeed('1');
    console.log(res);
  };

  useEffect(() => {
    loadDiveLogsFeed();
  }, []);

  const headlerCity = (value: any) => {
    setCity(value);
  };

  const headlerRegion = (value: any) => {
    setRegion(value);
  };

  return (
    <>
      <div className="w-full h-8" />
      <Select
        data={CITYLIST}
        value={CITYLIST.filter((d) => city.id === d.id)[0]}
        onChange={headlerCity}
      />
      <Select
        data={REGIONLIST}
        value={REGIONLIST.filter((d) => region.id === d.id)[0]}
        onChange={headlerRegion}
      />
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

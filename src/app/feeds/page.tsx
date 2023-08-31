'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import CheckCircle from '@/assets/icons/CheckCircle.svg';
import Select from '@/components/common/Select';
import FeedList from '@/components/page/feeds/FeedList';
import { fetchDiveLogsFeed } from '@/apis/feed';

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

const dsa2 = [
  { id: 1, selectedValue: '송산동', displayValue: '송산동' },
  { id: 2, selectedValue: '정방동', displayValue: '정방동' },
  { id: 3, selectedValue: '중앙동', displayValue: '중앙동' },
  { id: 4, selectedValue: '천지동', displayValue: '천지동' },
  { id: 5, selectedValue: '효돈동', displayValue: '효돈동' },
  { id: 6, selectedValue: '영천동', displayValue: '영천동' },
  { id: 7, selectedValue: '동홍동', displayValue: '동홍동' },
  { id: 8, selectedValue: '서홍동', displayValue: '서홍동' },
  { id: 9, selectedValue: '대륜동', displayValue: '대륜동' },
  { id: 10, selectedValue: '대천동', displayValue: '대천동' },
  { id: 11, selectedValue: '중문동', displayValue: '중문동' },
  { id: 12, selectedValue: '예래동', displayValue: '예래동' },
  { id: 13, selectedValue: '남원읍', displayValue: '남원읍' },
  { id: 14, selectedValue: '대정읍', displayValue: '대정읍' },
  { id: 15, selectedValue: '성산읍', displayValue: '성산읍' },
  { id: 16, selectedValue: '안덕면', displayValue: '안덕면' },
  { id: 17, selectedValue: '표선면', displayValue: '표선면' },
];

const CITYLIST = [
  { id: 1, selectedValue: '제주시', displayValue: '제주시' },
  { id: 2, selectedValue: '서귀포시', displayValue: '서귀포시' },
];

export default function Feed() {
  const [city, setCity] = useState<any>();
  const [region, setRegion] = useState<any>();
  const [snorkelActive, setSnorkelActive] = useState(false);
  const [freedivingActive, setFreedivingActive] = useState(false);
  const [scubaActive, setScubaActive] = useState(false);
  const [feedList, setFeedList] = useState<any>();

  const createData = () => {
    let data = '';

    if (
      (snorkelActive && freedivingActive && scubaActive) ||
      (!snorkelActive && !freedivingActive && !scubaActive)
    ) {
      data = 'SNORKEL,FREEDIVING,SCUBA';
    } else {
      if (snorkelActive) {
        data += 'SNORKEL,';
      }
      if (freedivingActive) {
        data += 'FREEDIVING,';
      }
      if (scubaActive) {
        data += 'SCUBA,';
      }
      // 마지막 쉼표 제거
      data = data.slice(0, -1);
    }
    return data;
  };

  const loadDiveLogsFeed = async () => {
    const res = await fetchDiveLogsFeed({
      address:
        city && region
          ? '제주특별자치도 ' + city?.selectedValue + ' ' + region?.selectedValue
          : null,
      type: createData(),
    });

    setFeedList(res);
  };

  useEffect(() => {
    loadDiveLogsFeed();
  }, [snorkelActive, freedivingActive, scubaActive, city, region]);

  useEffect(() => {
    setRegion(null);
  }, [city]);

  const headlerCity = (value: any) => {
    setCity(value);
  };

  const headlerRegion = (value: any) => {
    setRegion(value);
  };

  const data = city?.selectedValue === '서귀포시' ? dsa2 : REGIONLIST;

  return (
    <>
      <div className="w-full h-8" />
      <div className=" flex w-full gap-2">
        <Select
          data={CITYLIST}
          value={CITYLIST.filter((d) => city?.id === d.id)[0]}
          onChange={headlerCity}
          placeholder="시"
        />
        <Select
          data={data}
          value={data.filter((d) => region?.id === d.id)[0]}
          onChange={headlerRegion}
          placeholder="읍.면.동"
          action={(e: any) => {
            if (!city) {
              alert('시를 선택해주세요');
              e.preventDefault();
            }
          }}
        />
      </div>
      <div className="w-full h-8" />
      <div className="bg-[#E9EAF4] flex justify-between rounded-3xl py-2 px-2">
        <button
          onClick={() => {
            setSnorkelActive(!snorkelActive);
          }}
          className={`${
            snorkelActive
              ? 'bg-[#567BFF] text-white border-2 border-solid border-[#567BFF]'
              : 'border-[#92AAFD] border-2 border-solid bg-white text-[#7F7F7F]'
          } text-base outline-none flex items-center rounded-3xl py-1.5 px-2`}
        >
          스노클
          <CheckCircle color={snorkelActive ? 'white' : '#7F7F7F'} />
        </button>
        <button
          onClick={() => {
            setFreedivingActive(!freedivingActive);
          }}
          className={`${
            freedivingActive
              ? 'bg-[#567BFF] text-white border-2 border-solid border-[#567BFF]'
              : 'border-[#92AAFD] border-2 border-solid bg-white text-[#7F7F7F]'
          } text-base outline-none flex items-center rounded-3xl py-1.5 px-2`}
        >
          프리다이빙
          <CheckCircle color={freedivingActive ? 'white' : '#7F7F7F'} />
        </button>
        <button
          onClick={() => {
            setScubaActive(!scubaActive);
          }}
          className={`${
            scubaActive
              ? 'bg-[#567BFF] text-white border-2 border-solid border-[#567BFF]'
              : 'border-[#92AAFD] border-2 border-solid bg-white text-[#7F7F7F]'
          } text-base outline-none flex items-center rounded-3xl py-1.5 px-2`}
        >
          스쿠버다이빙
          <CheckCircle color={scubaActive ? 'white' : '#7F7F7F'} />
        </button>
      </div>
      <div className="mt-8">
        <div className="pb-24">
          <div className="grid gap-3 grid-cols-2 ">
            <FeedList feedList={feedList} />
          </div>
        </div>
      </div>
    </>
  );
}

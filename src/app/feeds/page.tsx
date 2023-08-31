'use client';

import { useState, useEffect } from 'react';

import Select from '@/components/common/Select';
import FeedList from '@/components/page/feeds/FeedList';
import { fetchDiveLogsFeed } from '@/apis/feed';
import { JEJICITYAREAS, SEOGWIPOCITYAREAS, CITYS } from '@/constants/cityAreas';
import { Area, City } from '@/types/area';
import { IFeed } from '@/types/feed';
import SelectActivities from '@/components/page/feeds/SelectActivities';

export default function Feed() {
  const [city, setCity] = useState<City>();
  const [area, setArea] = useState<Area>();
  const [snorkelActive, setSnorkelActive] = useState(false);
  const [freedivingActive, setFreedivingActive] = useState(false);
  const [scubaActive, setScubaActive] = useState(false);
  const [feedList, setFeedList] = useState<IFeed[]>();

  const createSelectedActivitiesString = () => {
    let selectedActivities = '';

    if (
      (snorkelActive && freedivingActive && scubaActive) ||
      (!snorkelActive && !freedivingActive && !scubaActive)
    ) {
      selectedActivities = 'SNORKEL,FREEDIVING,SCUBA';
    } else {
      if (snorkelActive) {
        selectedActivities += 'SNORKEL,';
      }
      if (freedivingActive) {
        selectedActivities += 'FREEDIVING,';
      }
      if (scubaActive) {
        selectedActivities += 'SCUBA,';
      }

      selectedActivities = selectedActivities.slice(0, -1);
    }
    return selectedActivities;
  };

  const loadDiveLogsFeed = async () => {
    const res = await fetchDiveLogsFeed({
      address:
        city && area ? '제주특별자치도 ' + city?.selectedValue + ' ' + area?.selectedValue : null,
      type: createSelectedActivitiesString(),
    });

    setFeedList(res);
  };

  useEffect(() => {
    loadDiveLogsFeed();
  }, [snorkelActive, freedivingActive, scubaActive, city, area]);

  useEffect(() => {
    setArea(undefined);
  }, [city]);

  const headlerCity = (value: any) => {
    setCity(value);
  };

  const headlerArea = (value: any) => {
    setArea(value);
  };

  const selectedAreas = city?.selectedValue === '서귀포시' ? SEOGWIPOCITYAREAS : JEJICITYAREAS;

  return (
    <>
      <div className="w-full h-8" />
      <div className="flex w-full gap-2">
        <Select
          data={CITYS}
          value={CITYS.find((c) => city?.id === c.id)}
          onChange={headlerCity}
          placeholder="시"
        />
        <Select
          data={selectedAreas}
          value={selectedAreas.find((a) => area?.id === a.id)}
          onChange={headlerArea}
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
      <SelectActivities
        snorkelActive={snorkelActive}
        setSnorkelActive={setSnorkelActive}
        freedivingActive={freedivingActive}
        setFreedivingActive={setFreedivingActive}
        scubaActive={scubaActive}
        setScubaActive={setScubaActive}
      />
      <div className="mt-8">
        <div className="pb-24">
          <div className="grid gap-3 grid-cols-2 mb-40">
            <FeedList feedList={feedList} />
          </div>
        </div>
      </div>
    </>
  );
}

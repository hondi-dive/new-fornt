'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import Link from 'next/link';

import { KakaoInfoWindow, KakaoLatLng, KakaoMap, KakaoMarker } from '@/types/kakao';
import Modal from '@/components/common/Modal';
import MapPin from '@/assets/icons/mapPin.svg';
import ArrowCircle from '@/assets/icons/arrowCircle.svg';
import SearchInput from '@/components/common/SearchInput';

const positions = [
  {
    id: 1,
    title: '판포포구',
    address: '제주특별자치도 제주시 한경면 판포리 2877-1',
    latlng: new window.kakao.maps.LatLng(33.365216, 126.200269),
  },
  {
    id: 2,
    title: '월령포구',
    address: '제주특별자치도 제주시 특별자치도, 한림읍 월령리 317-1',
    latlng: new window.kakao.maps.LatLng(33.378558, 126.21632),
  },
  {
    id: 3,
    title: '범섬',
    address: '제주특별자치도 서귀포시 법환동 산1-1',
    latlng: new window.kakao.maps.LatLng(33.218354, 126.516717),
  },
  {
    id: 4,
    title: '황우지선녀탕',
    address: '제주특별자치도 서귀포시 서홍동 795-5',
    latlng: new window.kakao.maps.LatLng(33.234152, 126.463248),
  },
  {
    id: 5,
    title: '김녕포구',
    address: '제주특별자치도 제주시 구좌읍 김녕리 4074-2',
    latlng: new window.kakao.maps.LatLng(33.239479, 126.548912),
  },
  {
    id: 6,
    title: '김녕해변',
    address: '제주특별자치도 제주시 구좌읍 구좌해안로 237',
    latlng: new window.kakao.maps.LatLng(33.557752, 126.758989),
  },
  {
    id: 7,
    title: '중문해수욕장',
    address: '제주특별자치도 서귀포시 중문관광로72번길 29-51',
    latlng: new window.kakao.maps.LatLng(33.243064, 126.412131),
  },
  {
    id: 8,
    title: '함덕해변',
    address: '제주특별자치도 제주시 조천읍 조함해안로 525',
    latlng: new window.kakao.maps.LatLng(33.543495, 126.669673),
  },
  {
    id: 9,
    title: '이호테우해변',
    address: '제주특별자치도 제주시 도리로 20',
    latlng: new window.kakao.maps.LatLng(33.498197, 126.45293),
  },
  {
    id: 10,
    title: '협재해변',
    address: '제주특별자치도 제주시 한림읍 한림로 329-10',
    latlng: new window.kakao.maps.LatLng(33.39439, 126.239582),
  },
];
declare global {
  interface Window {
    kakao: {
      maps: {
        Map: new (
          container: HTMLDivElement,
          options: { center: KakaoLatLng; level: number },
        ) => KakaoMap;
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Marker: new (options: { position: any; map?: any }) => KakaoMarker;
        InfoWindow: new (options?: { content?: string; removable?: boolean }) => KakaoInfoWindow;
        event: any;
        load: any;
      };
    };
  }
}

const NEXT_PUBLIC_KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

const KakaoMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [checkedSpot, setCheckedSpot] = useState<{
    title: string;
    address: string;
    id: null | number;
  }>({
    title: '',
    address: '',
    id: null,
  });
  const [map, setMap] = useState<KakaoMap | null>(null);

  const initMap = useCallback(() => {
    if (containerRef.current) {
      const center = new window.kakao.maps.LatLng(33.365216, 126.200269);
      const map = new window.kakao.maps.Map(containerRef.current, {
        center,
        level: 9,
      });

      for (let i = 0; i < positions.length; i++) {
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: positions[i].latlng,
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          setShowModal(true);
          setShowModal(true);
          setCheckedSpot({
            title: positions[i].title,
            address: positions[i].address,
            id: positions[i].id,
          });
          console.log(positions[i].title);
        });
      }

      const markerPosition = center;
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      setMap(map);
      marker.setMap(map);
    }
  }, []);

  useEffect(() => {
    if (window?.kakao) {
      initMap();
    }
  }, [initMap]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foundItem = positions.find((item) => item.title.includes(searchText)) as any;

    if (map && foundItem) {
      const moveLatLon = new window.kakao.maps.LatLng(foundItem?.latlng.Ma, foundItem?.latlng.La);

      map.panTo(moveLatLon);
    } else {
      alert('해당 검색 결과가 없습니다.');
    }
  };

  return (
    <div className="relative">
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&autoload=false`}
        onLoad={() => window.kakao.maps.load(initMap)}
      />
      <div
        className="absolute top-[64px] z-10 left-[50%] w-[calc(100%-24px)]"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <form onSubmit={(e) => onSearch(e)}>
          <SearchInput placeholder="원하는 바다를 검색해주세요" onChange={handleChange} />
        </form>
      </div>
      <Head>
        <link rel="preconnect" href="https://dapi.kakao.com" />
        <link rel="dns-prefetch" href="https://dapi.kakao.com" />
      </Head>
      <div id="map" ref={containerRef} className="h-screen w-full" />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        panelClassName="w-full max-w-[345px] rounded-lg bg-white p-6 text-left align-middle bg-opacity-80"
        titleClassName="text-black text-xl font-semibold mb-2"
        title={checkedSpot.title}
      >
        <div className="flex">
          <MapPin />
          <span className="mb-5">{checkedSpot.address}</span>
        </div>
        <button className="bg-[#567BFF] py-4 text-white w-[calc(100%-32px)] rounded-lg outline-none ml-4 relative">
          <Link href={`/feed/${checkedSpot.id}`}>
            게시판으로 이동하기
            <div className="absolute right-4 bottom-2">
              <ArrowCircle />
            </div>
          </Link>
        </button>
      </Modal>
    </div>
  );
};

export default React.memo(KakaoMap);

'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';

import Script from 'next/script';
import Head from 'next/head';
import Link from 'next/link';
import { pixelsToMeters } from '@/utils/meter';
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
    lat: 33.365216,
    lng: 126.200269,
  },
  {
    id: 2,
    title: '월령포구',
    address: '제주특별자치도 제주시 특별자치도, 한림읍 월령리 317-1',
    lat: 33.378558,
    lng: 126.21632,
  },
  {
    id: 3,
    title: '범섬',
    address: '제주특별자치도 서귀포시 법환동 산1-1',
    lat: 33.218354,
    lng: 126.516717,
  },
  {
    id: 4,
    title: '황우지선녀탕',
    address: '제주특별자치도 서귀포시 서홍동 795-5',
    lat: 33.234152,
    lng: 126.463248,
  },
  {
    id: 5,
    title: '김녕포구',
    address: '제주특별자치도 제주시 구좌읍 김녕리 4074-2',
    lat: 33.239479,
    lng: 126.548912,
  },
  {
    id: 6,
    title: '김녕해변',
    address: '제주특별자치도 제주시 구좌읍 구좌해안로 237',
    lat: 33.557752,
    lng: 126.758989,
  },
  {
    id: 7,
    title: '중문해수욕장',
    address: '제주특별자치도 서귀포시 중문관광로72번길 29-51',
    lat: 33.243064,
    lng: 126.412131,
  },
  {
    id: 8,
    title: '함덕해변',
    address: '제주특별자치도 제주시 조천읍 조함해안로 525',
    lat: 33.543495,
    lng: 126.669673,
  },
  {
    id: 9,
    title: '이호테우해변',
    address: '제주특별자치도 제주시 도리로 20',
    lat: 33.498197,
    lng: 126.45293,
  },
  {
    id: 10,
    title: '협재해변',
    address: '제주특별자치도 제주시 한림읍 한림로 329-10',
    lat: 33.39439,
    lng: 126.239582,
  },
];

declare global {
  interface Window {
    kakao: {
      maps: {
        MarkerImage: any;
        Point: any;
        Size: any;
        Map: new (
          container: HTMLDivElement,
          options: { center: KakaoLatLng; level: number },
        ) => KakaoMap;
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Marker: new (options: { position: any; map?: any; image?: any }) => KakaoMarker;
        InfoWindow: new (options?: { content?: string; removable?: boolean }) => KakaoInfoWindow;
        event: any;
        load: any;
        services: any;
      };
    };
  }
}

const NEXT_PUBLIC_KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

const KakaoMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [center, setCenter] = useState<any>();
  const [zoomLevel, setZoomLevel] = useState<any>();
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
      const center = new window.kakao.maps.LatLng(33.4, 126.55);
      const map = new window.kakao.maps.Map(containerRef.current, {
        center,
        level: 10,
      });

      window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
        const zoomLevel = map.getLevel() as number;
        setZoomLevel(zoomLevel);
      });
      window.kakao.maps.event.addListener(map, 'center_changed', function () {
        const zoomLevel = map.getCenter();
        setCenter(zoomLevel);
      });
      var imageSrc = 'https://i.postimg.cc/qMRDLNNg/spot.png',
        imageSize = new window.kakao.maps.Size(48, 48),
        imageOption = { offset: new window.kakao.maps.Point(24, 48) };
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      for (let i = 0; i < positions.length; i++) {
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(positions[i].lat, positions[i].lng),
          image: markerImage,
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          setShowModal(true);
          setShowModal(true);
          setCheckedSpot({
            title: positions[i].title,
            address: positions[i].address,
            id: positions[i].id,
          });
        });
      }

      setMap(map);
    }
  }, []);

  useEffect(() => {
    if (window?.kakao) {
      initMap();
    }
  }, [initMap]);

  useEffect(() => {
    console.log(center, pixelsToMeters(zoomLevel, containerRef.current?.offsetHeight));
  }, [center, zoomLevel, containerRef.current]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foundItem = positions.find((item) => item.title.includes(searchText)) as any;

    if (map && foundItem) {
      const moveLatLon = new window.kakao.maps.LatLng(foundItem?.lat, foundItem?.lng);

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

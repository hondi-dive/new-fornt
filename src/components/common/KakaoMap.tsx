'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import Script from 'next/script';
import Head from 'next/head';
import Link from 'next/link';
import { pixelsToMeters } from '@/utils/meter';
import { KakaoInfoWindow, KakaoLatLng, KakaoMap, KakaoMarker } from '@/types/kakao';
import Modal from '@/components/common/Modal';
import MapPin from '@/assets/icons/mapPin.svg';
import ArrowCircle from '@/assets/icons/arrowCircle.svg';
import SearchInput from '@/components/common/SearchInput';
import { fetchMap } from '@/apis/map';

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
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [center2, setCenter2] = useState<any>({ Ma: 33.4, La: 126.55 });
  const [positions, setPositions] = useState<any>([]);
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
      const center = new window.kakao.maps.LatLng(center2.Ma, center2.La) as any;
      const map = new window.kakao.maps.Map(containerRef.current, {
        center,
        level: 10,
      });

      const updateMarkers = (newPositions: any) => {
        for (let i = 0; i < newPositions.length; i++) {
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(
              newPositions[i].latitude,
              newPositions[i].longitude,
            ),
            image: markerImage,
          });
          console.log(newPositions[i]);
          window.kakao.maps.event.addListener(marker, 'click', () => {
            router.push(`/feed/detail/${newPositions[i].divelogId}`);
          });
        }
      };

      const handleCenterChange = async () => {
        const center = map.getCenter();
        const zoomLevel = map.getLevel() as number;

        const res = await fetchMap(
          center.getLat(),
          center.getLng(),
          pixelsToMeters(zoomLevel, containerRef.current?.offsetHeight) ?? 500000,
        );

        updateMarkers(res);
      };
      window.kakao.maps.event.addListener(map, 'dragend', handleCenterChange);
      window.kakao.maps.event.addListener(map, 'zoom_changed', handleCenterChange);

      var imageSrc = 'https://i.postimg.cc/qMRDLNNg/spot.png',
        imageSize = new window.kakao.maps.Size(24, 24),
        imageOption = { offset: new window.kakao.maps.Point(12, 24) };
      var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      setMap(map);
    }
  }, []);

  useEffect(() => {
    if (window?.kakao) {
      initMap();
    }
  }, [initMap]);

  const loadMap = async (latitude: number, longitude: number, sideLength: number) => {
    const res = await fetchMap(latitude, longitude, sideLength);

    setPositions(res);
  };

  useEffect(() => {
    loadMap(
      center2.Ma,
      center2.La,
      pixelsToMeters(zoomLevel, containerRef.current?.offsetHeight) ?? 500000,
    );
  }, [center2, zoomLevel, containerRef.current]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foundItem = positions.find((item: any) => item.title.includes(searchText)) as any;

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

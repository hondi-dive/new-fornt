'use client';

import React, { useEffect, useRef, useCallback, useState, ReactElement } from 'react';
import Script from 'next/script';
import Head from 'next/head';

import { KakaoInfoWindow, KakaoLatLng, KakaoMap, KakaoMarker } from '@/types/kakao';
import Modal from '@/components/common/Modal';

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
  const [modalContent, setModalContent] = useState<{ title: string; body: null | ReactElement }>({
    title: '',
    body: null,
  });

  const initMap = useCallback(() => {
    if (containerRef.current) {
      const center = new window.kakao.maps.LatLng(33.365216, 126.200269);
      const map = new window.kakao.maps.Map(containerRef.current, {
        center,
        level: 9,
      });

      const positions = [
        {
          id: 1,
          title: '판포포구',
          content: <div>판포포구</div>,
          latlng: new window.kakao.maps.LatLng(33.365216, 126.200269),
        },
        {
          id: 2,
          title: '월령포구',
          content: <div>월령포구</div>,
          latlng: new window.kakao.maps.LatLng(33.378558, 126.21632),
        },
        {
          id: 3,
          title: '범섬',
          content: <div>범섬</div>,
          latlng: new window.kakao.maps.LatLng(33.218354, 126.516717),
        },
        {
          id: 4,
          title: '황우지선녀탕',
          content: <div>황우지선녀탕</div>,
          latlng: new window.kakao.maps.LatLng(33.234152, 126.463248),
        },
        {
          id: 5,
          title: '김녕포구',
          content: <div>김녕포구</div>,
          latlng: new window.kakao.maps.LatLng(33.239479, 126.548912),
        },
        {
          id: 6,
          title: '김녕해변',
          content: <div>김녕해변</div>,
          latlng: new window.kakao.maps.LatLng(33.557752, 126.758989),
        },
        {
          id: 7,
          title: '중문해수욕장',
          content: <div>중문해수욕장</div>,
          latlng: new window.kakao.maps.LatLng(33.243064, 126.412131),
        },
        {
          id: 8,
          title: '함덕해변',
          content: <div>함덕해변</div>,
          latlng: new window.kakao.maps.LatLng(33.543495, 126.669673),
        },
        {
          id: 9,
          title: '이호테우해변',
          content: <div>이호테우해변</div>,
          latlng: new window.kakao.maps.LatLng(33.498197, 126.45293),
        },
        {
          id: 10,
          title: '협재해변',
          content: <div>협재해변</div>,
          latlng: new window.kakao.maps.LatLng(33.39439, 126.239582),
        },
      ];

      for (let i = 0; i < positions.length; i++) {
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: positions[i].latlng,
        });
        const infowindow = new window.kakao.maps.InfoWindow({
          content: String(positions[i].content),
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          setShowModal(true);
          setShowModal(true);
          setModalContent({ title: positions[i].title, body: positions[i].content });
          console.log(positions[i].title);
        });

        window.kakao.maps.event.addListener(
          marker,
          'mouseover',
          makeOverListener(map, marker, infowindow),
        );
        window.kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

        new window.kakao.maps.event.addListener(
          marker,
          'mouseover',
          makeOverListener(map, marker, infowindow),
        );
        new window.kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
      }

      const markerPosition = center;
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);
    }
  }, []);

  const makeOverListener = useCallback(
    (map: KakaoMap, marker: KakaoMarker, infowindow: KakaoInfoWindow) => {
      return function () {
        infowindow.open(map, marker);
      };
    },
    [],
  );

  const makeOutListener = useCallback((infowindow: KakaoInfoWindow) => {
    return function () {
      infowindow.close();
    };
  }, []);

  useEffect(() => {
    if (window?.kakao) {
      initMap();
    }
  }, [initMap]);

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&autoload=false`}
        onLoad={() => window.kakao.maps.load(initMap)}
      />
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
        title={modalContent.title}
      >
        {modalContent.body}
      </Modal>
    </>
  );
};

export default React.memo(KakaoMap);

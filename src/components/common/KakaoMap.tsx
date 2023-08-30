'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import Script from 'next/script';
import Head from 'next/head';

import { pixelsToMeters } from '@/utils/meter';
import { KakaoInfoWindow, KakaoLatLng, KakaoMap, KakaoMarker } from '@/types/kakao';
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

  const initMap = useCallback(async () => {
    if (containerRef.current) {
      const center = new window.kakao.maps.LatLng(33.4, 126.55) as any;
      const map = new window.kakao.maps.Map(containerRef.current, {
        center,
        level: 10,
      });

      const imageSrc = 'https://i.postimg.cc/qMRDLNNg/spot.png',
        imageSize = new window.kakao.maps.Size(24, 24),
        imageOption = { offset: new window.kakao.maps.Point(12, 24) };

      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

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

      const loadInitialData = async () => {
        const center = map.getCenter();
        const zoomLevel = map.getLevel() as number;
        const res = await fetchMap(
          center.getLat(),
          center.getLng(),
          pixelsToMeters(zoomLevel, containerRef.current?.offsetHeight) ?? 500000,
        );

        updateMarkers(res);
      };

      await loadInitialData();

      window.kakao.maps.event.addListener(map, 'dragend', handleCenterChange);
      window.kakao.maps.event.addListener(map, 'zoom_changed', handleCenterChange);
    }
  }, []);

  useEffect(() => {
    if (window?.kakao) {
      initMap();
    }
  }, [initMap]);

  return (
    <div className="relative">
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&autoload=false`}
        onLoad={() => window.kakao.maps.load(initMap)}
      />
      <Head>
        <link rel="preconnect" href="https://dapi.kakao.com" />
        <link rel="dns-prefetch" href="https://dapi.kakao.com" />
      </Head>
      <div id="map" ref={containerRef} className="h-screen w-full" />
    </div>
  );
};

export default React.memo(KakaoMap);

"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Script from "next/script";
import Head from "next/head";

import {
  KakaoInfoWindow,
  KakaoLatLng,
  KakaoMap,
  KakaoMarker,
} from "@/types/kakao";

declare global {
  interface Window {
    kakao: {
      maps: {
        Map: new (
          container: HTMLDivElement,
          options: { center: KakaoLatLng; level: number }
        ) => KakaoMap;
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        Marker: new (options: { position: KakaoLatLng }) => KakaoMarker;
        InfoWindow: new (options?: {
          content?: string;
          removable?: boolean;
        }) => KakaoInfoWindow;
        event: any;
        load: any;
      };
    };
  }
}

const NEXT_PUBLIC_KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

const KakaoMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const initMap = useCallback(() => {
    if (containerRef.current) {
      const center = new window.kakao.maps.LatLng(37.55, 126.95);
      const map = new window.kakao.maps.Map(containerRef.current, {
        center,
        level: 9,
      });

      const markerPosition = center;
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      const infowindow = new window.kakao.maps.InfoWindow({
        content: "Hello, Kakao Map!", // 인포윈도우 내용 설정
        removable: true,
      });

      window.kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, infowindow)
      );
      window.kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infowindow)
      );

      marker.setMap(map);
    }
  }, []);

  const makeOverListener = useCallback(
    (map: KakaoMap, marker: KakaoMarker, infowindow: KakaoInfoWindow) => {
      return function () {
        infowindow.open(map, marker);
      };
    },
    []
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
    <React.Fragment>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&autoload=false`}
        onLoad={() => window.kakao.maps.load(initMap)}
      />
      <Head>
        <link rel="preconnect" href="https://dapi.kakao.com" />
        <link rel="dns-prefetch" href="https://dapi.kakao.com" />
      </Head>
      <div
        id="map"
        ref={containerRef}
        className="shadow-md h-screen -lg:h-96 w-full"
      />
    </React.Fragment>
  );
};

export default React.memo(KakaoMap);

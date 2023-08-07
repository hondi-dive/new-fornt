export type KakaoLatLng = { getLat: () => number; getLng: () => number };

export type KakaoMap = { setCenter: (latlng: KakaoLatLng) => void };

export type KakaoMarker = {
  getPosition: () => KakaoLatLng;
  setMap: (map: KakaoMap | null) => void;
  addListener: (event: string, callback: () => void) => void;
};

export type KakaoInfoWindow = {
  close: () => void;
  open: (map: KakaoMap, marker: KakaoMarker) => void;
};

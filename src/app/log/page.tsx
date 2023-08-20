'use client';
import ImageUploader from '@/components/page/log/ImageUploader';
import Satisfaction from '@/components/page/log/Satisfaction';
import StepContainer from '@/components/page/log/StepContainer';
import Button from '@/components/common/Button';
import Select from '@/components/common/Select';
import HeaderLayout from '@/layouts/HeaderLayout';
import ProgressTitle from '@/components/page/log/ProgressTitle';
import Input from '@/components/common/Input';
import { useCallback, useEffect, useRef, useState } from 'react';
import SubTitleContainer from '@/components/common/SubTitleContainer';
import InputWithUnit from '@/components/common/InputWithUnit';
import Link from 'next/link';
import CaretLeftIcon from '@/assets/icons/CaretLeft.svg';
import Spot from '@/assets/icons/spot.svg';
import Script from 'next/script';
import { KakaoLatLng, KakaoMap } from '@/types/kakao';
import PlacePicker from '@/components/page/log/PlacePicker';
import { LogData } from '@/types/log';

const NEXT_PUBLIC_KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

export default function Log() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [pageType, setPageType] = useState<'log' | 'logDetail'>('log');
  const [placeModal, setPlaceModal] = useState(false);
  const [latLng, setLatLng] = useState({ lat: 33.378306, lng: 126.5424 });
  const [address, setAddress] = useState('제주특별자치도 제주시 아라동');
  const [logData, setLogData] = useState<LogData>({
    place: '',
    date: new Date().toISOString().substring(0, 10),
    type: 'scuba',
    satisfaction: 0,
    hashTag: [],
    comment: '',
  });

  const displayCenterInfo = (result: any, status: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      for (var i = 0; i < result.length; i++) {
        if (result[i].region_type === 'H') {
          setAddress(result[i].address_name);
          break;
        }
      }
    }
  };

  const searchAddrFromCoords = (
    coords: KakaoLatLng,
    callback: (result: any, status: any) => void,
  ) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  };

  const initMap = useCallback(() => {
    let centerChange: KakaoMap;
    if (mapRef.current) {
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.376692, 126.54222),
        level: 11,
      };

      const map = new window.kakao.maps.Map(mapRef.current, mapOption);

      centerChange = window.kakao.maps.event.addListener(map, 'center_changed', () => {
        const coords = map.getCenter();
        setLatLng({ lat: coords.getLat(), lng: coords.getLng() });
        searchAddrFromCoords(coords, displayCenterInfo);
      });
    }

    return () => window.kakao.maps.event.removeListener(centerChange);
  }, [mapRef]);

  useEffect(() => {
    if (placeModal) {
      initMap();
    }
  }, [placeModal, initMap]);

  const updateLogData = (key: keyof LogData, value: string | number | string[]) => {
    setLogData((prev) => ({ ...prev, [key]: value }));
  };

  const handleClickPlaceAdd = () => {
    updateLogData('place', address);
    setPlaceModal(false);
  };

  return (
    <HeaderLayout
      title="나의로그 작성"
      nextComponent={
        pageType === 'log' ? (
          <button
            onClick={() => setPageType('logDetail')}
            className="text-[#426BFF] text-lg font-semibold disabled:text-[#d9d9d9]"
          >
            다음
          </button>
        ) : (
          <Link
            href="/feed/1"
            className="text-[#426BFF] text-lg font-semibold disabled:text-[#d9d9d9]"
          >
            등록
          </Link>
        )
      }
      backComponent={
        pageType === 'logDetail' ? (
          <button onClick={() => setPageType('log')}>
            <CaretLeftIcon />
          </button>
        ) : undefined
      }
    >
      {placeModal && (
        <PlacePicker showModal={placeModal} setShowModal={setPlaceModal}>
          <div className="relative flex justify-center items-center">
            <div className="absolute z-40 mb-10">
              <Spot />
            </div>
            <div className="w-1 h-1 bg-red-600 absolute z-50" />

            <Script
              src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&autoload=false&libraries=services`}
              onLoad={() => window.kakao.maps.load(initMap)}
            />
            <div
              ref={mapRef}
              className="w-full h-[350px] mb-5 relative justify-center items-center"
            />
          </div>
          <div>{address}</div>
          <Button size="small" onClick={handleClickPlaceAdd}>
            <div className="text-white">확인</div>
          </Button>
        </PlacePicker>
      )}
      <div className="p-6 flex flex-col gap-[42px]">
        <ProgressTitle
          currProgress={pageType === 'log' ? 1 : 2}
          totalProgress={2}
          text={`경험을 담아서\n나만의 로그를 작성해볼까요?`}
        />

        {pageType === 'log' ? (
          <>
            <StepContainer step={1} title="바다장소 등록">
              {logData.place ? (
                <Button color="selected" onClick={() => setPlaceModal(true)}>
                  <span className=" text-lg text-[#426BFF]">{logData.place}</span>
                </Button>
              ) : (
                <Button onClick={() => setPlaceModal(true)}>
                  <span className=" text-lg text-white">장소등록</span>
                </Button>
              )}
            </StepContainer>

            <StepContainer step={2} title="등록날짜 입력">
              <Select>
                <option>2023년 8월 5일</option>
                <option>test2</option>
              </Select>
            </StepContainer>

            <StepContainer step={3} title="활동유형 선택">
              <Select>
                <option>스쿠버 다이빙</option>
                <option>test2</option>
              </Select>
            </StepContainer>

            <StepContainer step={4} title="만족도 선택">
              <div className="h-[50px] w-full border-[1px] border-[#d9d9d9] border-solid rounded-lg flex items-center justify-center">
                <Satisfaction />
              </div>
            </StepContainer>

            <StepContainer step={5} title="등록할 사진선택">
              <ImageUploader />
            </StepContainer>

            <StepContainer step={6} title="해시태그 등록">
              <Input placeholder="# 해시태그" style={{ border: '1px solid #a5a5a5' }} />
            </StepContainer>

            <StepContainer step={7} title="한줄후기 입력">
              <Input placeholder="한줄후기 입력" style={{ border: '1px solid #a5a5a5' }} />
            </StepContainer>
          </>
        ) : (
          <>
            <StepContainer step={8} title="로그데이터 선택">
              <SubTitleContainer title="입수형태">
                <div className="flex gap-3">
                  <Button size="small" color="secondary">
                    <span className=" font-medium text-white">해안</span>
                  </Button>
                  <Button size="small" color="normal">
                    <span className=" font-medium text-black">보트</span>
                  </Button>
                  <Button size="small" color="normal">
                    <span className=" font-medium text-black">기타</span>
                  </Button>
                </div>
              </SubTitleContainer>

              <SubTitleContainer title="수면해류">
                <div className="flex gap-3">
                  <Button size="small" color="secondary">
                    <span className=" font-medium text-white">강한해류</span>
                  </Button>
                  <Button size="small" color="normal">
                    <span className=" font-medium text-black">약한해류</span>
                  </Button>
                  <Button size="small" color="normal">
                    <span className=" font-medium text-black">조류없음</span>
                  </Button>
                </div>
              </SubTitleContainer>

              <SubTitleContainer title="심층해류">
                <div className="flex gap-3">
                  <Button size="small" color="secondary">
                    <span className=" font-medium text-white">강한해류</span>
                  </Button>
                  <Button size="small" color="normal">
                    <span className=" font-medium text-black">약한해류</span>
                  </Button>
                  <Button size="small" color="normal">
                    <span className=" font-medium text-black">조류없음</span>
                  </Button>
                </div>
              </SubTitleContainer>
            </StepContainer>

            <StepContainer step={9} title="로그데이터 기록">
              <div className="flex gap-[17px]">
                <SubTitleContainer title="수온">
                  <InputWithUnit _size="small" unit={'℃'} />
                </SubTitleContainer>
                <SubTitleContainer title="기온">
                  <InputWithUnit _size="small" unit={'℃'} />
                </SubTitleContainer>
              </div>

              <div className="flex gap-[17px]">
                <SubTitleContainer title="입수전 잔량">
                  <InputWithUnit _size="small" unit={'bar'} />
                </SubTitleContainer>
                <SubTitleContainer title="입수후 잔량">
                  <InputWithUnit _size="small" unit={'bar'} />
                </SubTitleContainer>
              </div>

              <div className="flex gap-[17px]">
                <SubTitleContainer title="다이브 최고수심">
                  <InputWithUnit _size="small" unit={'m'} />
                </SubTitleContainer>
                <SubTitleContainer title="포인트 수심">
                  <InputWithUnit _size="small" unit={'m'} />
                </SubTitleContainer>
              </div>

              <div className="flex gap-[17px]">
                <SubTitleContainer title="다이브 시간">
                  <InputWithUnit _size="small" unit={'분'} />
                </SubTitleContainer>
                <SubTitleContainer title="감압시간">
                  <InputWithUnit _size="small" unit={'분'} />
                </SubTitleContainer>
              </div>

              <div className="flex gap-[17px]">
                <div className="w-full">
                  <SubTitleContainer title="시야">
                    <InputWithUnit _size="small" unit={'m'} />
                  </SubTitleContainer>
                </div>
                <div className="w-full" />
              </div>
            </StepContainer>
          </>
        )}
        <div className=" h-24" />
      </div>
    </HeaderLayout>
  );
}

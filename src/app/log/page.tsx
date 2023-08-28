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
import CaretLeftIcon from '@/assets/icons/CaretLeft.svg';
import Spot from '@/assets/icons/spot.svg';
import Script from 'next/script';
import { KakaoLatLng, KakaoMap } from '@/types/kakao';
import PlacePicker from '@/components/page/log/PlacePicker';
import { LogData } from '@/types/log';
import ArrowDown from '@/assets/icons/arrowDown.svg';
import { convertDashToKorean } from '@/utils/format';
import LogDataSelector from '@/components/page/log/LogDataSelector';
import { useRouter } from 'next/navigation';
import { fetchCreateDiveLogs } from '@/apis/log';
import HashTagsInput from '@/components/page/log/HashTagsInput';
import MapPin from '@/assets/icons/mapPin.svg';

const NEXT_PUBLIC_KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

export default function Log() {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [pageType, setPageType] = useState<'log' | 'logDetail'>('log');
  const [placeModal, setPlaceModal] = useState(false);
  const [imageForm, setImageForm] = useState<FormData>();
  const [address, setAddress] = useState('제주특별자치도 제주시 아라동');
  const [logData, setLogData] = useState<LogData>({
    address: '',
    latitude: 33.378306, // 한라산 국립공원 위도
    longitude: 126.5424, // 한라산 국립공원 경도
    diveAt: new Date().toISOString(),
    diveType: 'SCUBA',
    score: 0,
    review: '',
    isPublic: -1,
    approachType: undefined,
    surfaceFlow: undefined,
    deepFlow: undefined,
    waterTemp: undefined,
    temp: undefined,
    beforeTank: undefined,
    afterTank: undefined,
    diveDepth: undefined,
    pointDepth: undefined,
    diveTime: undefined,
    decompressionTime: undefined,
    distanceView: undefined,
    hashTags: [],
  });

  const fetchDiveLogs = async () => {
    try {
      if (!checkValidData()) return;
      const formData = createFormData();
      if (!formData) return alert('이미지를 넣어주세요');
      await fetchCreateDiveLogs(formData);

      router.replace('/feeds');
    } catch (error) {
      console.log(error);
      alert('피드 등록에 실패 하였습니다.');
    }
  };

  const checkValidData = () => {
    if (imageForm === undefined) {
      alert('피드 이미지를 설정해주세요');
      return false;
    }

    if (logData.isPublic === -1) {
      alert('자물쇠를 눌러 공개 비공개를 설정해주세요');
      return false;
    }

    if (logData.diveType === 'SCUBA' || logData.diveType === 'FREEDIVING') {
      if (logData.approachType === undefined) {
        alert('입수 형태를 입력해주세요');
        return false;
      }
      if (logData.surfaceFlow === undefined) {
        alert('수면 해류를 입력해주세요');
        return false;
      }
      if (logData.deepFlow === undefined) {
        alert('심층 해류를 입력해주세요');
        return false;
      }
      if (logData.waterTemp === undefined) {
        alert('수온을 입력해주세요');
        return false;
      }
      if (logData.temp === undefined) {
        alert('기온을 입력해주세요');
        return false;
      }
    }

    if (logData.diveType === 'SCUBA') {
      if (logData.beforeTank === undefined) {
        alert('입수전 잔량을 입력해주세요');
        return false;
      }
      if (logData.afterTank === undefined) {
        alert('입수후 잔량을 입력해주세요');
        return false;
      }
      if (logData.diveDepth === undefined) {
        alert('다이브 최고수심을 입력해주세요');
        return false;
      }
      if (logData.pointDepth === undefined) {
        alert('포인트 수심을 입력해주세요');
        return false;
      }
      if (logData.diveTime === undefined) {
        alert('다이브 시간을 입력해주세요');
        return false;
      }
      if (logData.decompressionTime === undefined) {
        alert('감압 시간을 입력해주세요');
        return false;
      }
    }

    if (logData.distanceView === undefined) {
      alert('시야를 입력해주세요');
      return false;
    }

    return true;
  };

  const createFormData = () => {
    const {
      address,
      latitude,
      longitude,
      diveAt,
      diveType,
      score,
      review,
      isPublic,
      approachType,
      surfaceFlow,
      deepFlow,
      waterTemp,
      temp,
      distanceView,
      hashTags,
      beforeTank,
      afterTank,
      diveDepth,
      pointDepth,
      diveTime,
      decompressionTime,
    } = logData;

    switch (logData.diveType) {
      case 'SCUBA':
        imageForm?.append(
          'contents',
          new Blob(
            [
              JSON.stringify({
                address,
                latitude,
                longitude,
                diveAt,
                diveType,
                score,
                review,
                isPublic: isPublic === 1 ? true : false,
                approachType,
                surfaceFlow,
                deepFlow,
                waterTemp,
                temp,
                distanceView,
                hashTags,
                beforeTank,
                afterTank,
                diveDepth,
                pointDepth,
                diveTime,
                decompressionTime,
              }),
            ],
            { type: 'application/json' },
          ),
        );
        break;
      case 'FREEDIVING':
        imageForm?.append(
          'contents',
          new Blob(
            [
              JSON.stringify({
                address,
                latitude,
                longitude,
                diveAt,
                diveType,
                score,
                review,
                isPublic: isPublic === 1 ? true : false,
                approachType,
                surfaceFlow,
                deepFlow,
                waterTemp,
                temp,
                distanceView,
                hashTags,
              }),
            ],
            { type: 'application/json' },
          ),
        );
        break;
      case 'SNORKEL':
        imageForm?.append(
          'contents',
          new Blob(
            [
              JSON.stringify({
                address,
                latitude,
                longitude,
                diveAt,
                diveType,
                score,
                review,
                isPublic: isPublic === 1 ? true : false,
                distanceView,
                hashTags,
              }),
            ],
            { type: 'application/json' },
          ),
        );
        break;

      default:
        throw 'data error';
    }

    return imageForm;
  };

  const DIVE_TYPE_SELECT_DATA = [
    { id: 1, displayValue: '스쿠버 다이빙', selectedValue: 'SCUBA' },
    { id: 2, displayValue: '프리 다이빙', selectedValue: 'FREEDIVING' },
    { id: 3, displayValue: '스노클링', selectedValue: 'SNORKEL' },
  ];

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
    if (mapRef.current && window?.kakao) {
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.376692, 126.54222),
        level: 11,
      };

      const map = new window.kakao.maps.Map(mapRef.current, mapOption);

      centerChange = window.kakao.maps.event.addListener(map, 'center_changed', () => {
        const coords = map.getCenter();
        updateLogData('latitude', coords.getLat());
        updateLogData('longitude', coords.getLng());
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
    updateLogData('address', address);
    setPlaceModal(false);
  };

  const handleClickDiveType = (value: {
    id: number | string;
    selectedValue: string;
    displayValue: string;
  }) => {
    updateLogData('diveType', value.selectedValue);
    initLogData();
  };

  const initLogData = () => {
    setLogData((prev) => ({
      ...prev,
      approachType: undefined,
      surfaceFlow: undefined,
      deepFlow: undefined,
      waterTemp: undefined,
      temp: undefined,
      beforeTank: undefined,
      afterTank: undefined,
      diveDepth: undefined,
      pointDepth: undefined,
      diveTime: undefined,
      decompressionTime: undefined,
      distanceView: undefined,
    }));
  };

  return (
    <HeaderLayout
      title="나의로그 작성"
      nextComponent={
        pageType === 'log' ? (
          <button
            disabled={!logData.address}
            onClick={() => setPageType('logDetail')}
            className="text-[#426BFF] text-lg font-semibold disabled:text-[#d9d9d9]"
          >
            다음
          </button>
        ) : (
          <button
            className="text-[#426BFF] text-lg font-semibold disabled:text-[#d9d9d9]"
            onClick={fetchDiveLogs}
          >
            등록
          </button>
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
            <div className="absolute z-40 mb-5">
              <Spot />
            </div>

            <Script
              src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&autoload=false&libraries=services`}
              onLoad={() => window.kakao.maps.load(initMap)}
            />
            <div
              ref={mapRef}
              className="w-[300px] h-[300px] rounded-lg relative justify-center items-center"
            />
          </div>
          <div className="flex mt-5 mb-6">
            <MapPin />
            <span>{address}</span>
          </div>
          <Button onClick={handleClickPlaceAdd}>
            <div className="text-white">장소등록</div>
          </Button>
        </PlacePicker>
      )}
      <div className="p-6 flex flex-col gap-[42px]">
        <ProgressTitle
          currProgress={pageType === 'log' ? 1 : 2}
          totalProgress={2}
          text={`경험을 담아서\n나만의 로그를 작성해볼까요?`}
          isPublic={logData.isPublic}
          updateLogData={updateLogData}
        />

        {pageType === 'log' ? (
          <>
            <StepContainer step={1} title="바다장소 등록">
              {logData.address ? (
                <Button color="selected" onClick={() => setPlaceModal(true)}>
                  <span className=" text-lg text-[#426BFF]">{logData.address}</span>
                </Button>
              ) : (
                <Button onClick={() => setPlaceModal(true)}>
                  <span className=" text-lg text-white">장소등록</span>
                </Button>
              )}
            </StepContainer>

            <StepContainer step={2} title="등록날짜 입력">
              <button
                className={`relative h-[50px] flex items-center w-full border-[1px] border-[#d9d9d9] border-solid rounded-lg justify-center`}
                onClick={() => dateRef?.current && dateRef.current.showPicker()}
              >
                <span
                  className={`text-[17px] ${!logData.address ? 'text-[#7f7f7f]' : 'text-black'}`}
                >
                  {convertDashToKorean(logData.diveAt.substring(0, 10))}
                </span>
                <div className="absolute right-7">
                  <ArrowDown />
                </div>
                <input
                  ref={dateRef}
                  type="date"
                  className="absolute bottom-0 left-0 opacity-0"
                  onChange={(e) => {
                    const date = e.target.value.split('-');
                    updateLogData(
                      'diveAt',
                      new Date(
                        Number(date[0]),
                        Number(date[1]) - 1,
                        Number(date[2]),
                        9,
                      ).toISOString(),
                    );
                  }}
                />
              </button>
            </StepContainer>

            <StepContainer step={3} title="활동유형 선택">
              <Select
                disabled={!logData.address}
                data={DIVE_TYPE_SELECT_DATA}
                value={DIVE_TYPE_SELECT_DATA.filter((d) => d.selectedValue === logData.diveType)[0]}
                onChange={handleClickDiveType}
              />
            </StepContainer>

            <StepContainer step={4} title="만족도 선택">
              <div className="h-[50px] w-full border-[1px] border-[#d9d9d9] border-solid rounded-lg flex items-center justify-center">
                <Satisfaction onChange={(value) => updateLogData('score', value)} />
              </div>
            </StepContainer>

            <StepContainer step={5} title="등록할 사진선택">
              <ImageUploader setImageForm={setImageForm} />
            </StepContainer>

            <StepContainer step={6} title="해시태그 등록">
              <HashTagsInput
                updateHashTags={(value: string[]) => updateLogData('hashTags', value)}
              />
            </StepContainer>

            <StepContainer step={7} title="한줄후기 입력">
              <Input
                placeholder="한줄후기 입력"
                style={{ border: '1px solid #a5a5a5' }}
                onChange={(e) => updateLogData('review', e.target.value)}
              />
            </StepContainer>
          </>
        ) : (
          <>
            {(logData.diveType === 'FREEDIVING' || logData.diveType === 'SCUBA') && (
              <StepContainer step={8} title="로그데이터 선택">
                <LogDataSelector
                  title="입수 형태"
                  value={logData.approachType || ''}
                  selectedData={[
                    {
                      selectedValue: 'BEATCH',
                      displayValue: '해안',
                      onClick: () => updateLogData('approachType', 'BEATCH'),
                    },
                    {
                      selectedValue: 'BOAT',
                      displayValue: '보트',
                      onClick: () => updateLogData('approachType', 'BOAT'),
                    },
                    {
                      selectedValue: 'ETC',
                      displayValue: '기타',
                      onClick: () => updateLogData('approachType', 'ETC'),
                    },
                  ]}
                />

                <LogDataSelector
                  title="수면해류"
                  value={logData.surfaceFlow || ''}
                  selectedData={[
                    {
                      selectedValue: 'STRONG',
                      displayValue: '강한해류',
                      onClick: () => updateLogData('surfaceFlow', 'STRONG'),
                    },
                    {
                      selectedValue: 'MIDDLE',
                      displayValue: '중간해류',
                      onClick: () => updateLogData('surfaceFlow', 'MIDDLE'),
                    },
                    {
                      selectedValue: 'WEAK',
                      displayValue: '약한해류',
                      onClick: () => updateLogData('surfaceFlow', 'WEAK'),
                    },
                  ]}
                />

                <LogDataSelector
                  title="심층해류"
                  value={logData.deepFlow || ''}
                  selectedData={[
                    {
                      selectedValue: 'STRONG',
                      displayValue: '강한해류',
                      onClick: () => updateLogData('deepFlow', 'STRONG'),
                    },
                    {
                      selectedValue: 'MIDDLE',
                      displayValue: '중간해류',
                      onClick: () => updateLogData('deepFlow', 'MIDDLE'),
                    },
                    {
                      selectedValue: 'WEAK',
                      displayValue: '약한해류',
                      onClick: () => updateLogData('deepFlow', 'WEAK'),
                    },
                  ]}
                />
              </StepContainer>
            )}

            <StepContainer step={logData.diveType === 'SNORKEL' ? 8 : 9} title="로그데이터 기록">
              {(logData.diveType === 'FREEDIVING' || logData.diveType === 'SCUBA') && (
                <div className="flex gap-[17px]">
                  <SubTitleContainer title="수온">
                    <InputWithUnit
                      _size="small"
                      type="number"
                      unit={'℃'}
                      value={logData.waterTemp}
                      onChange={(e) => updateLogData('waterTemp', Number(e.target.value))}
                    />
                  </SubTitleContainer>
                  <SubTitleContainer title="기온">
                    <InputWithUnit
                      _size="small"
                      type="number"
                      unit={'℃'}
                      value={logData.temp}
                      onChange={(e) => updateLogData('temp', Number(e.target.value))}
                    />
                  </SubTitleContainer>
                </div>
              )}

              {logData.diveType === 'SCUBA' && (
                <>
                  <div className="flex gap-[17px]">
                    <SubTitleContainer title="입수전 잔량">
                      <InputWithUnit
                        _size="small"
                        unit={'bar'}
                        type="number"
                        value={logData.beforeTank}
                        onChange={(e) => updateLogData('beforeTank', Number(e.target.value))}
                      />
                    </SubTitleContainer>
                    <SubTitleContainer title="입수후 잔량">
                      <InputWithUnit
                        _size="small"
                        unit={'bar'}
                        type="number"
                        value={logData.afterTank}
                        onChange={(e) => updateLogData('afterTank', Number(e.target.value))}
                      />
                    </SubTitleContainer>
                  </div>

                  <div className="flex gap-[17px]">
                    <SubTitleContainer title="다이브 최고수심">
                      <InputWithUnit
                        _size="small"
                        unit={'m'}
                        type="number"
                        value={logData.diveDepth}
                        onChange={(e) => updateLogData('diveDepth', Number(e.target.value))}
                      />
                    </SubTitleContainer>
                    <SubTitleContainer title="포인트 수심">
                      <InputWithUnit
                        _size="small"
                        unit={'m'}
                        type="number"
                        value={logData.pointDepth}
                        onChange={(e) => updateLogData('pointDepth', Number(e.target.value))}
                      />
                    </SubTitleContainer>
                  </div>

                  <div className="flex gap-[17px]">
                    <SubTitleContainer title="다이브 시간">
                      <InputWithUnit
                        _size="small"
                        unit={'분'}
                        type="number"
                        value={logData.diveTime}
                        onChange={(e) => updateLogData('diveTime', Number(e.target.value))}
                      />
                    </SubTitleContainer>
                    <SubTitleContainer title="감압시간">
                      <InputWithUnit
                        _size="small"
                        unit={'분'}
                        type="number"
                        value={logData.decompressionTime}
                        onChange={(e) => updateLogData('decompressionTime', Number(e.target.value))}
                      />
                    </SubTitleContainer>
                  </div>
                </>
              )}

              <div className="flex gap-[17px]">
                <div className="w-full">
                  <SubTitleContainer title="시야">
                    <InputWithUnit
                      _size="small"
                      unit={'m'}
                      type="number"
                      value={logData.distanceView}
                      onChange={(e) => updateLogData('distanceView', Number(e.target.value))}
                    />
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

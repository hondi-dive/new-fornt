import InputWithUnit from '@/components/common/InputWithUnit';
import SubTitleContainer from '@/components/common/SubTitleContainer';
import IdBadge from '@/components/page/feed/IdBadge';
import LogDataSelector from '@/components/page/log/LogDataSelector';
import HeaderLayout from '@/layouts/HeaderLayout';
import { FeedDetailPage, FeedDetailType } from '@/types/feed';
import CaretLeftIcon from '@/assets/icons/CaretLeft.svg';

interface Props {
  feedData: FeedDetailType;
  routeFeedDetail: (value: FeedDetailPage) => void;
}

export default function FeedDetailLog({ feedData, routeFeedDetail }: Props) {
  return (
    <HeaderLayout
      title="로그 기록"
      backComponent={
        <button onClick={() => routeFeedDetail('feedDetailMain')}>
          <CaretLeftIcon size={24} color="#000" />
        </button>
      }
    >
      <div className=" px-6 py-[22px]">
        <div className="flex justify-start">
          <IdBadge id={feedData.writer.nickName} />
        </div>

        <div className="mt-10">
          <LogDataSelector
            title="입수 형태"
            value={feedData.approachType || ''}
            selectedData={[
              {
                selectedValue: 'BEATCH',
                displayValue: '해안',
                onClick: () => {},
              },
              {
                selectedValue: 'BOAT',
                displayValue: '보트',
                onClick: () => {},
              },
              {
                selectedValue: 'ETC',
                displayValue: '기타',
                onClick: () => {},
              },
            ]}
          />
          <LogDataSelector
            title="수면해류"
            value={feedData.surfaceFlow || ''}
            selectedData={[
              {
                selectedValue: 'STRONG',
                displayValue: '강한해류',
                onClick: () => {},
              },
              {
                selectedValue: 'MIDDLE',
                displayValue: '중간해류',
                onClick: () => {},
              },
              {
                selectedValue: 'WEAK',
                displayValue: '약한해류',
                onClick: () => {},
              },
            ]}
          />
          <LogDataSelector
            title="심층해류"
            value={feedData.deepFlow || ''}
            selectedData={[
              {
                selectedValue: 'STRONG',
                displayValue: '강한해류',
                onClick: () => {},
              },
              {
                selectedValue: 'MIDDLE',
                displayValue: '중간해류',
                onClick: () => {},
              },
              {
                selectedValue: 'WEAK',
                displayValue: '약한해류',
                onClick: () => {},
              },
            ]}
          />
        </div>

        <div className=" mt-10">
          <div className="flex gap-[17px]">
            <SubTitleContainer title="수온">
              <InputWithUnit disabled={true} _size="small" unit={'℃'} value={feedData.waterTemp} />
            </SubTitleContainer>
            <SubTitleContainer title="기온">
              <InputWithUnit disabled={true} _size="small" unit={'℃'} value={feedData.temp} />
            </SubTitleContainer>
          </div>

          <div className="flex gap-[17px]">
            <SubTitleContainer title="입수전 잔량">
              <InputWithUnit
                disabled={true}
                _size="small"
                unit={'bar'}
                value={feedData.beforeTank}
              />
            </SubTitleContainer>
            <SubTitleContainer title="입수후 잔량">
              <InputWithUnit
                disabled={true}
                _size="small"
                unit={'bar'}
                value={feedData.afterTank}
              />
            </SubTitleContainer>
          </div>

          <div className="flex gap-[17px]">
            <SubTitleContainer title="다이브 최고수심">
              <InputWithUnit disabled={true} _size="small" unit={'m'} value={feedData.diveDepth} />
            </SubTitleContainer>
            <SubTitleContainer title="포인트 수심">
              <InputWithUnit disabled={true} _size="small" unit={'m'} value={feedData.pointDepth} />
            </SubTitleContainer>
          </div>

          <div className="flex gap-[17px]">
            <SubTitleContainer title="다이브 시간">
              <InputWithUnit disabled={true} _size="small" unit={'분'} value={feedData.diveTime} />
            </SubTitleContainer>
            <SubTitleContainer title="감압시간">
              <InputWithUnit
                disabled={true}
                _size="small"
                unit={'분'}
                value={feedData.decompressionTime}
              />
            </SubTitleContainer>
          </div>

          <div className="flex gap-[17px]">
            <div className="w-full">
              <SubTitleContainer title="시야">
                <InputWithUnit
                  disabled={true}
                  _size="small"
                  unit={'m'}
                  value={feedData.distanceView}
                />
              </SubTitleContainer>
            </div>
            <div className="w-full" />
          </div>
          <div className="h-40" />
        </div>
      </div>
    </HeaderLayout>
  );
}

import StepContainer from '@/components/page/log/StepContainer';
import SubTitleContainer from '@/components/common/SubTitleContainer';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import HeaderLayout from '@/layouts/HeaderLayout';
import ProgressTitle from '@/components/page/log/ProgressTitle';
import Link from 'next/link';

export default function LogDetail() {
  return (
    <HeaderLayout
      title="나의로그 작성"
      nextComponent={
        <Link
          href="/feed/1"
          replace
          className="text-[#426BFF] text-lg font-semibold disabled:text-[#d9d9d9]"
        >
          등록
        </Link>
      }
    >
      <div className="p-6 flex flex-col gap-[42px]">
        <ProgressTitle
          currProgress={2}
          totalProgress={2}
          text={`경험을 담아서\n나만의 로그를 작성해볼까요?`}
        />
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
              <Input style={{ textAlign: 'right' }} _size="small" unit={'℃'} />
            </SubTitleContainer>
            <SubTitleContainer title="기온">
              <Input style={{ textAlign: 'right' }} _size="small" unit={'℃'} />
            </SubTitleContainer>
          </div>

          <div className="flex gap-[17px]">
            <SubTitleContainer title="입수전 잔량">
              <Input style={{ textAlign: 'right' }} _size="small" unit={'bar'} />
            </SubTitleContainer>
            <SubTitleContainer title="입수후 잔량">
              <Input style={{ textAlign: 'right' }} _size="small" unit={'bar'} />
            </SubTitleContainer>
          </div>

          <div className="flex gap-[17px]">
            <SubTitleContainer title="다이브 최고수심">
              <Input style={{ textAlign: 'right' }} _size="small" unit={'m'} />
            </SubTitleContainer>
            <SubTitleContainer title="포인트 수심">
              <Input style={{ textAlign: 'right' }} _size="small" unit={'m'} />
            </SubTitleContainer>
          </div>

          <div className="flex gap-[17px]">
            <SubTitleContainer title="다이브 시간">
              <Input style={{ textAlign: 'right' }} _size="small" unit={'분'} />
            </SubTitleContainer>
            <SubTitleContainer title="감압시간">
              <Input style={{ textAlign: 'right' }} _size="small" unit={'분'} />
            </SubTitleContainer>
          </div>

          <div className="flex gap-[17px]">
            <div className="w-full">
              <SubTitleContainer title="시야">
                <Input style={{ textAlign: 'right' }} _size="small" unit={'m'} />
              </SubTitleContainer>
            </div>
            <div className="w-full" />
          </div>
        </StepContainer>
        <div className=" h-24" />
      </div>
    </HeaderLayout>
  );
}

import StepContainer from '@/app/log/StepContainer';
import SubTitleContainer from '@/app/log/detail/SubTitleContainer';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

export default function LogDetail() {
  return (
    <>
      <StepContainer step={6} title="해시태그 등록">
        <Input placeholder="#해시태그" />
      </StepContainer>

      <StepContainer step={7} title="로그데이터 선택">
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

      <StepContainer step={8} title="로그데이터 기록">
        <div className="flex gap-[17px]">
          <SubTitleContainer title="수온">
            <Input unit={'℃'} />
          </SubTitleContainer>
          <SubTitleContainer title="기온">
            <Input unit={'℃'} />
          </SubTitleContainer>
        </div>

        <div className="flex gap-[17px]">
          <SubTitleContainer title="입수전 잔량">
            <Input unit={'bar'} />
          </SubTitleContainer>
          <SubTitleContainer title="입수후 잔량">
            <Input unit={'bar'} />
          </SubTitleContainer>
        </div>

        <div className="flex gap-[17px]">
          <SubTitleContainer title="다이브 최고수심">
            <Input unit={'m'} />
          </SubTitleContainer>
          <SubTitleContainer title="포인트 수심">
            <Input unit={'m'} />
          </SubTitleContainer>
        </div>

        <div className="flex gap-[17px]">
          <SubTitleContainer title="다이브 시간">
            <Input unit={'분'} />
          </SubTitleContainer>
          <SubTitleContainer title="감압시간">
            <Input unit={'분'} />
          </SubTitleContainer>
        </div>

        <div className="flex gap-[17px]">
          <div className="w-full">
            <SubTitleContainer title="시야">
              <Input unit={'m'} />
            </SubTitleContainer>
          </div>
          <div className="w-full" />
        </div>
      </StepContainer>
    </>
  );
}

import IdBadge from '@/components/page/feed/IdBadge';
import SubTitleContainer from '@/components/common/SubTitleContainer';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import HeaderLayout from '@/layouts/HeaderLayout';
import InputWithUnit from '@/components/common/InputWithUnit';

export default function FeedDetailLog() {
  return (
    <HeaderLayout title="로그 기록">
      <div className=" px-6 py-[22px]">
        <div className="flex justify-start">
          <IdBadge id="Cherisher_y" />
        </div>

        <div className="mt-10">
          <SubTitleContainer title="입수형태">
            <div className="flex gap-3">
              <Button size="small" color="secondary">
                <span className="text-white">해안</span>
              </Button>
              <Button size="small" color="normal">
                <span>해안</span>
              </Button>
              <Button size="small" color="normal">
                <span>해안</span>
              </Button>
            </div>
          </SubTitleContainer>

          <SubTitleContainer title="수면해류">
            <div className="flex gap-3">
              <Button size="small" color="secondary">
                <span className="text-white">강한해류</span>
              </Button>
              <Button size="small" color="normal">
                <span>약한해류</span>
              </Button>
              <Button size="small" color="normal">
                <span>조류없음</span>
              </Button>
            </div>
          </SubTitleContainer>

          <SubTitleContainer title="심층해류">
            <div className="flex gap-3">
              <Button size="small" color="secondary">
                <span className="text-white">강한해류</span>
              </Button>
              <Button size="small" color="normal">
                <span>약한해류</span>
              </Button>
              <Button size="small" color="normal">
                <span>조류없음</span>
              </Button>
            </div>
          </SubTitleContainer>
        </div>

        <div className=" mt-10">
          <div className="flex gap-[17px]">
            <SubTitleContainer title="수온">
              <InputWithUnit disabled={true} _size="small" unit={'℃'} />
            </SubTitleContainer>
            <SubTitleContainer title="기온">
              <InputWithUnit disabled={true} _size="small" unit={'℃'} />
            </SubTitleContainer>
          </div>

          <div className="flex gap-[17px]">
            <SubTitleContainer title="입수전 잔량">
              <InputWithUnit disabled={true} _size="small" unit={'bar'} />
            </SubTitleContainer>
            <SubTitleContainer title="입수후 잔량">
              <InputWithUnit disabled={true} _size="small" unit={'bar'} />
            </SubTitleContainer>
          </div>

          <div className="flex gap-[17px]">
            <SubTitleContainer title="다이브 최고수심">
              <InputWithUnit disabled={true} _size="small" unit={'m'} />
            </SubTitleContainer>
            <SubTitleContainer title="포인트 수심">
              <InputWithUnit disabled={true} _size="small" unit={'m'} />
            </SubTitleContainer>
          </div>

          <div className="flex gap-[17px]">
            <SubTitleContainer title="다이브 시간">
              <InputWithUnit disabled={true} _size="small" unit={'분'} />
            </SubTitleContainer>
            <SubTitleContainer title="감압시간">
              <InputWithUnit disabled={true} _size="small" unit={'분'} />
            </SubTitleContainer>
          </div>

          <div className="flex gap-[17px]">
            <div className="w-full">
              <SubTitleContainer title="시야">
                <InputWithUnit disabled={true} _size="small" unit={'m'} />
              </SubTitleContainer>
            </div>
            <div className="w-full" />
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
}

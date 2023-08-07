'use client';
import StepContainer from '@/app/log/StepContainer';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import Select from '@/components/common/Select';
import { useRouter } from 'next/navigation';

export default function Log() {
  const router = useRouter();

  const handleNextClick = () => {
    router.push('logDetail');
  };

  return (
    <div>
      <Header
        title="나의로그 작성"
        onBackClick={() => router.back()}
        onNextClick={handleNextClick}
      />
      Log
      <div className="p-5 flex flex-col gap-[42px]">
        <StepContainer step={1} title="바다장소 등록">
          <Button onClick={() => console.log('test')}>
            <span className=" text-lg text-white">장소등록</span>
          </Button>
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
      </div>
    </div>
  );
}

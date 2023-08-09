'use client';
import ImageUploader from '@/app/log/ImageUploader';
import Satisfaction from '@/app/log/Satisfaction';
import StepContainer from '@/app/log/StepContainer';
import Button from '@/components/common/Button';
import Select from '@/components/common/Select';

export default function Log() {
  return (
    <>
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

      <StepContainer step={4} title="만족도 선택">
        <Satisfaction />
      </StepContainer>

      <StepContainer step={5} title="등록할 사진선택">
        <ImageUploader />
      </StepContainer>
    </>
  );
}

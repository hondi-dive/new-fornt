'use client';

import ImageUploader from '@/components/page/log/ImageUploader';
import Satisfaction from '@/components/page/log/Satisfaction';
import StepContainer from '@/components/page/log/StepContainer';
import Button from '@/components/common/Button';
import Select from '@/components/common/Select';
import HeaderLayout from '@/layouts/HeaderLayout';
import ProgressTitle from '@/components/page/log/ProgressTitle';
import Input from '@/components/common/Input';

export default function Log() {
  return (
    <HeaderLayout title="나의로그 작성" nextPath="/log/detail">
      <div className="p-6 flex flex-col gap-[42px]">
        <ProgressTitle
          currProgress={1}
          totalProgress={2}
          text={`경험을 담아서\n나만의 로그를 작성해볼까요?`}
        />
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
          <div className="h-[50px] w-full border-[1px] border-[#d9d9d9] border-solid rounded-lg flex items-center justify-center">
            <Satisfaction />
          </div>
        </StepContainer>

        <StepContainer step={5} title="등록할 사진선택">
          <ImageUploader />
        </StepContainer>

        <StepContainer step={6} title="해시태그 등록">
          <Input placeholder="# 해시태그" />
        </StepContainer>

        <StepContainer step={7} title="한줄후기 입력">
          <Input placeholder="한줄후기 입력" />
        </StepContainer>
        <div className=" h-24" />
      </div>
    </HeaderLayout>
  );
}

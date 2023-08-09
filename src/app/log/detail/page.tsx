import StepContainer from '@/app/log/StepContainer';

export default function LogDetail() {
  return (
    <>
      <StepContainer step={6} title="해시태그 등록">
        해시태그
      </StepContainer>

      <StepContainer step={7} title="로그데이터 선택">
        로그 데이터 선택
      </StepContainer>

      <StepContainer step={8} title="로그데이터 기록">
        로그 데이터 기록
      </StepContainer>
    </>
  );
}

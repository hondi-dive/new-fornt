'use client';
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
      <div className='p-5'>

      <Select>
        <option>
          test1
        </option>
        <option>
          test2
        </option>
        </Select>
      </div>
    </div>
  );
}

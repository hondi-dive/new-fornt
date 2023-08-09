import KakaoMap from '@/components/common/KakaoMap';
import SearchInput from '@/components/common/SearchInput';

export default function Home() {
  return (
    <div className="relative">
      <KakaoMap />
      <div
        className="absolute top-[64px] z-10 left-[50%] w-[calc(100%-24px)]"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <SearchInput placeholder="원하는 바다를 검색해주세요" />
      </div>
    </div>
  );
}

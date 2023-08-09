import KakaoMap from "@/components/common/KakaoMap";
import SearchInput from "@/components/page/home/SearchInput";

export default function Home() {
  return (
    <div className="relative">
      <KakaoMap />
      <SearchInput />
    </div>
  );
}

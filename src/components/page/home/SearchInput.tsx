import SearchIcon from "@/assets/icons/search.svg";

export default function SearchInput() {
  return (
    <div
      className="absolute top-[64px] z-10 left-[50%] w-[calc(100%-24px)]"
      style={{
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative h-[60px]">
        <div className="absolute top-[10px] left-6">
          <SearchIcon />
        </div>
        <input
          className="py-2 pl-16 outline-none cursor-pointer w-full h-11 pr-12 text-sm bg-white border-0  placeholder-[#7F7F7F] rounded-[32px] placeholder-font-medium"
          placeholder="원하는 바다를 선택해주세요"
          name="todayLink"
        />
      </div>
    </div>
  );
}

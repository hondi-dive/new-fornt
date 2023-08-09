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
        <div className="absolute top-[19px] left-6">
          <SearchIcon />
        </div>
        <input
          className="py-2 pl-16 h-[60px]  cursor-pointer w-full pr-12  bg-white placeholder-[#7F7F7F] rounded-[32px] placeholder-font-medium border-[#D9D9D9] border-solid border text-lg"
          placeholder="원하는 바다를 선택해주세요"
          name="todayLink"
        />
      </div>
    </div>
  );
}

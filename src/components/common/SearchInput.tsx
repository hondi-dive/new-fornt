import SearchIcon from '@/assets/icons/search.svg';

interface SearchInputProps {
  placeholder: string;
}

export default function SearchInput({ placeholder }: SearchInputProps) {
  return (
    <div className="w-full">
      <div className="relative h-[60px]">
        <div className="absolute top-[19px] left-6">
          <SearchIcon />
        </div>
        <input
          className="py-2 pl-16 h-[60px]  cursor-pointer w-full pr-12  bg-white placeholder-[#7F7F7F] rounded-[32px] placeholder-font-medium border-[#D9D9D9] border-solid border text-lg"
          placeholder={placeholder}
          name="todayLink"
        />
      </div>
    </div>
  );
}

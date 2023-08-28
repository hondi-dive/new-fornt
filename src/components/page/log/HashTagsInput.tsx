import { useEffect, useRef, useState } from 'react';

interface Props {
  updateHashTags: (value: string[]) => void;
}

export default function HashTagsInput({ updateHashTags }: Props) {
  const hashRef = useRef<HTMLDivElement>(null);
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [hashTag, setHashTag] = useState('');

  useEffect(() => {
    hashRef.current?.scrollTo({ left: hashRef.current.scrollWidth - 100 });
    updateHashTags(hashTags);
  }, [hashTags]);

  return (
    <div
      ref={hashRef}
      className="flex scroll-smooth items-center overflow-x-auto no-scrollbar border-[1px] border-solid border-[#a5a5a5] w-full outline-none text-sm px-[18px] rounded-lg bg-transparent h-[50px]"
    >
      <div className="flex gap-1">
        {hashTags.map((tag, idx) => (
          <span key={idx} className=" whitespace-nowrap">
            <span className=" bg-blue-400 p-1 rounded-lg text-white">{`#${tag}`}</span>,
          </span>
        ))}
      </div>
      <input
        className="ml-1 outline-none min-w-[100px] bg-transparent"
        value={hashTag}
        placeholder="#해시태그"
        onChange={(e) => {
          const shopValue = e.target.value.split('#');
          if (shopValue.length >= 3) {
            setHashTags((prev) => [...prev, shopValue[1]]);
            setHashTag('#');
            return;
          }
          const doubleWhiteSpaceValue = e.target.value.split('  ');
          if (doubleWhiteSpaceValue.length >= 2) {
            setHashTags((prev) => [...prev, doubleWhiteSpaceValue[0].substring(1)]);
            setHashTag('#');
            return;
          }

          setHashTag(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Backspace') {
            if (hashTag === '') {
              setHashTags((prev) => prev.slice(0, -1));
            }
          } else if (e.key === 'Enter') {
            const hashTagValue = hashTag.replace('#', '');
            if (hashTagValue.length >= 1) {
              setHashTags((prev) => [...prev, hashTagValue]);
              setHashTag('#');
            }
          }
        }}
      />
    </div>
  );
}

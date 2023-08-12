interface Props {
  text: string;
}

export default function HashTag({ text }: Props) {
  return (
    <span className="bg-[#e9eaf4] flex justify-center px-[26px] h-8 items-center  border-solid border-[1px] border-[#92aafd] rounded-2xl font-medium text-sm">
      {`#${text}`}
    </span>
  );
}

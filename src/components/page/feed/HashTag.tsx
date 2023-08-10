interface Props {
  text: string;
}

export default function HashTag({ text }: Props) {
  return (
    <span className="bg-[#f3f4f9] flex justify-center px-[26px] h-8 items-center  border-solid border-[1px] border-[#7f7f7f] rounded-2xl font-medium text-sm">
      {`#${text}`}
    </span>
  );
}

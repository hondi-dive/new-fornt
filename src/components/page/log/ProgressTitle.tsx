interface Props {
  currProgress: number;
  totalProgress: number;
  text: string;
}

export default function ProgressTitle({ currProgress, totalProgress, text }: Props) {
  return (
    <div className="flex flex-col items-start gap-[10px] mb-4">
      <div className="bg-black h-6 px-[17px] rounded-2xl flex items-center">
        <span className="text-white">{`${currProgress}/${totalProgress}`}</span>
      </div>
      <div>
        <span className=" text-2xl font-bold leading-8 whitespace-pre-wrap">{text}</span>
      </div>
    </div>
  );
}

interface Props {
  id: string;
}

export default function IdBadge({ id }: Props) {
  return (
    <div className=" h-8 rounded-2xl bg-[rgba(0,0,0,0.6)] px-[19px] flex justify-center items-center text-white">
      {id}
    </div>
  );
}

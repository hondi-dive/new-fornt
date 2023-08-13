import Image, { StaticImageData } from 'next/image';

interface Props {
  imgSrc?: StaticImageData | string;
  userId: string;
  date: string;
  text: string;
}

export default function Comment({ imgSrc, userId, date, text }: Props) {
  return (
    <div className="flex mb-10">
      <div className="min-w-[40px] mr-[18px] w-10 h-10 rounded-full overflow-hidden bg-[#d9d9d9]">
        {imgSrc && (
          <Image alt="profile image" src={imgSrc} width={40} height={40} objectFit="cover" />
        )}
      </div>
      <div>
        <div className="flex justify-between items-center">
          <span>{userId}</span>
          <span className=" text-sm text-[#7f7f7f]">{date}</span>
        </div>
        <div className="mt-[7px] text-sm text-[#383838]">{text}</div>
      </div>
    </div>
  );
}

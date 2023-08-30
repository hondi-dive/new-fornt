import Image, { StaticImageData } from 'next/image';

interface Props {
  isMine: boolean;
  imgUrl?: string;
  userId: string;
  date: string;
  text: string;
}

export default function Comment({ imgUrl, userId, date, text, isMine }: Props) {
  return (
    <div className="flex mb-10">
      {/* {isMine && (
      <div>
        <span>수정</span>
        <span>삭제</span>
      </div>
      )} */}
      <div className="min-w-[40px] mr-[18px] w-10 h-10 rounded-full overflow-hidden bg-[#d9d9d9]">
        {imgUrl && <img alt="profile image" src={imgUrl} className="w-10 h-10 object-cover" />}
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <span>{userId}</span>
          <span className=" text-sm text-[#7f7f7f]">{date}</span>
        </div>
        <div className="mt-[7px] text-sm text-[#383838]">{text}</div>
      </div>
    </div>
  );
}

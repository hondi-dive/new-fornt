import Image from 'next/image';
import dumiImg from '@/assets/images/diving.png';
import Camera from '@/assets/icons/camera.svg';
import Pencil from '@/assets/icons/pencilSimpleLine.svg';

export default function My() {
  return (
    <div className=" px-4">
      <div className="flex flex-col justify-center items-center py-9">
        <div className="relative">
          <Image
            alt="profile image"
            src={dumiImg}
            width={100}
            height={100}
            className=" rounded-[50px]"
          />
          <button className=" w-8 h-8 rounded-2xl flex justify-center items-center bg-[#d9d9d9] absolute bottom-0 right-0">
            <Camera />
          </button>
        </div>

        <div className=" flex items-center relative mt-5">
          <span>CHERISHHER</span>
          <button className="absolute -right-7">
            <Pencil />
          </button>
        </div>
      </div>

      <div className="flex items-center px-2 h-12 rounded-3xl bg-[#e9eaf4] gap-1">
        <div className="flex justify-center items-center w-full bg-[#567bff] h-9 rounded-[20px] text-white">
          <span className="text-[15px]">내 로그</span>
        </div>
        <div className="flex justify-center items-center w-full bg-white h-9 rounded-[20px] ">
          <span className="text-[15px]">좋아요 한 로그</span>
        </div>
        <div className="flex justify-center items-center w-full bg-white h-9 rounded-[20px] ">
          <span className="text-[15px]">댓글 단 로그</span>
        </div>
      </div>

      <div className="grid gap-3 grid-cols-2 mt-8">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="bg-slate-400 w-full h-[168px] rounded-lg" />
        ))}
      </div>
    </div>
  );
}

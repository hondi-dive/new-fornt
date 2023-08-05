import LogoIcon from '@/assets/icons/logo.svg';
import KakaoIcon from '@/assets/icons/kakaoLogo.svg';

export default async function Login() {
  return (
    <div className="pt-64 px-4 bg-[#EDF1FF] h-screen">
      <div className=" flex items-center mb-48 justify-center">
        <LogoIcon />
        <span className=" ml-5 text-[80px] font-['SlowSlow']">이거바당</span>
      </div>
      <div className=" text-black text-sm font-medium mb-6 text-center">
        SNS 계정으로 간편 가입하기
      </div>
      <button className="cursor-pointer w-full rounded-lg bg-[#FEE500] text-black inline-flex items-center relative justify-center h-14">
        <div className="absolute left-3 top-5">
          <KakaoIcon />
        </div>
        카카오 로그인
      </button>
    </div>
  );
}

import Image from 'next/image';
import dumiImage from '@/assets/images/diving.png';
import Input from '@/components/common/Input';
import useWindowSize from '@/hooks/useWindowSize';
import Comment from '@/components/page/feed/Comment';

export default function FeedComment() {
  const windowSize = useWindowSize();
  const commentInputHeight = 100;
  const logButtonHeight = 71;
  const headerHeight = 64;
  const commentContainerHeight = windowSize?.height
    ? windowSize.height - commentInputHeight - headerHeight - logButtonHeight
    : 500;

  return (
    <div className="bg-white rounded-b-3xl overflow-hidden flex flex-col">
      <div
        className="flex flex-col px-6 overflow-y-auto no-scrollbar"
        style={{ height: commentContainerHeight }}
      >
        <div className="min-h-[33px]" />
        {Array.from({ length: 10 }, (_, i) => (
          <Comment
            key={i}
            userId="cherisher_y"
            date="2023.08.05"
            text="저도 오늘 다녀온 장소인데 미리 여기 올라온 정보 보고 가면 좋았을 것 같긴 합니다!"
          />
        ))}
        <div className="min-h-[50px]" />
      </div>

      <div className="w-full h-[100px] py-[25px] px-6 bg-[#e9eaf4] flex items-center">
        <div className="bg-[#d9d9d9] min-w-fit mr-[9px] w-10 h-10 rounded-full overflow-hidden">
          <Image alt="my profile image" src={dumiImage} width={40} height={40} objectFit="cover" />
        </div>

        <div className="w-full">
          <Input placeholder="댓글을 입력해주세요" style={{ background: '#fff' }} />
        </div>
      </div>
    </div>
  );
}

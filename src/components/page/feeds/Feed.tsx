import Link from 'next/link';
import Image from 'next/image';

export default function Feed({ feed }: any) {
  return (
    <Link href={`/feed/detail/${feed.divelogId}`}>
      <div className="w-full h-[168px]  relative">
        <Image src={feed.imageUri} alt="썸네일" fill className="rounded-lg" />
      </div>
    </Link>
  );
}

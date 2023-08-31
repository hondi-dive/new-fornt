import FeedSkeleton from '@/components/page/feeds/FeedSkeleton';
import Feed from '@/components/page/feeds/Feed';
import { IFeed } from '@/types/feed';

interface FeedListProps {
  feedList: IFeed[] | undefined;
}

export default function FeedList({ feedList }: FeedListProps) {
  if (!feedList) {
    return (
      <>
        <FeedSkeleton />
        <FeedSkeleton />
        <FeedSkeleton />
        <FeedSkeleton />
        <FeedSkeleton />
        <FeedSkeleton />
        <FeedSkeleton />
      </>
    );
  }

  return (
    <>
      {feedList.map((feed) => (
        <Feed key={feed.divelogId} feed={feed} />
      ))}
    </>
  );
}

import FeedSkeleton from '@/components/page/feeds/FeedSkeleton';
import Feed from '@/components/page/feeds/Feed';

export default function FeedList({ feedList }: any) {
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
      {feedList.map((feed: any) => (
        <Feed key={feed.divelogId} feed={feed} />
      ))}
    </>
  );
}

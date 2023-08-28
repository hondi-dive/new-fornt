import Input from '@/components/common/Input';
import useWindowSize from '@/hooks/useWindowSize';
import Comment from '@/components/page/feed/Comment';
import { fetchCommentList, fetchCreateComment, fetchUserDetail } from '@/apis/log';
import { useEffect, useState } from 'react';
import { FeedCommentType } from '@/types/feed';

interface Props {
  diveLogId: string;
}

export default function FeedComment({ diveLogId }: Props) {
  const windowSize = useWindowSize();
  const commentInputHeight = 100;
  const logButtonHeight = 71;
  const headerHeight = 64;
  const commentContainerHeight = windowSize?.height
    ? windowSize.height - commentInputHeight - headerHeight - logButtonHeight
    : 500;

  const [userData, setUserData] = useState({
    id: 0,
    nickName: '',
    imageUri: '',
    email: '',
  });
  const [commentList, setCommentList] = useState<FeedCommentType[]>([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    request();
  }, []);

  const request = async () => {
    await fetchUserData();
    fetchGetCommentList();
  };

  const fetchUserData = async () => {
    try {
      const res = await fetchUserDetail();
      setUserData(res);
    } catch (error) {
      console.log(error);
      alert('요청중에 에러가 발생하였습니다.');
    }
  };

  const fetchGetCommentList = async () => {
    try {
      const res = await fetchCommentList(diveLogId);
      setCommentList(res);
    } catch (error) {
      console.log(error);
      alert('요청중에 에러가 발생하였습니다.');
    }
  };

  const fetchCreateLogComment = async () => {
    try {
      await fetchCreateComment({
        divelogId: diveLogId,
        content: comment,
      });

      setComment('');
      fetchGetCommentList();
    } catch (error) {
      console.log(error);
      alert('요청중에 에러가 발생하였습니다.');
    }
  };

  return (
    <div className="bg-white rounded-b-3xl overflow-hidden flex flex-col">
      <div
        className="flex flex-col px-6 overflow-y-auto no-scrollbar"
        style={{ height: commentContainerHeight }}
      >
        <div className="min-h-[33px]" />
        {commentList.map((comment, i) => (
          <Comment
            key={i}
            isMine={comment.user.email === userData.email}
            imgUrl={comment.user.imageUri || ''}
            userId={comment.user.nickName}
            date={
              comment.modifiedAt
                ? comment.modifiedAt.substring(0, 10).split('-').join('.')
                : new Date().toISOString().substring(0, 10).split('-').join('.')
            }
            text={comment.content}
          />
        ))}
        <div className="min-h-[50px]" />
      </div>

      <div className="w-full h-[100px] py-[25px] px-6 bg-[#e9eaf4] flex items-center">
        <div className="bg-[#d9d9d9] min-w-fit mr-[9px] w-10 h-10 rounded-full overflow-hidden">
          <img alt="my profile image" src={userData.imageUri} className="w-10 h-10 object-cover" />
        </div>

        <div className="w-full">
          <Input
            placeholder="댓글을 입력해주세요"
            style={{ background: '#fff' }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                fetchCreateLogComment();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

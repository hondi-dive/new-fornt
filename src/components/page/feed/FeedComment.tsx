import Image from 'next/image';
import dumiImage from '@/assets/images/diving.png';
import Input from '@/components/common/Input';
import useWindowSize from '@/hooks/useWindowSize';
import Comment from '@/components/page/feed/Comment';
import { fetchCommentList, fetchUserDetail } from '@/apis/log';
import { useEffect, useState } from 'react';

export default function FeedComment() {
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
  const [commentList, setCommentList] = useState<
    {
      id: number;
      user: {
        id: number;
        nickName: string;
        imageUri: string;
        email: string;
      };
      content: string;
      createdAt: null | string;
      modifiedAt: null | string;
    }[]
  >([]);

  useEffect(() => {
    request();
  }, []);

  const request = async () => {
    await fetchUserData();
    fetchComment();
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

  const fetchComment = async () => {
    try {
      const res = await fetchCommentList(3);
      console.log(res);
      setCommentList(res);
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
          <Image alt="my profile image" src={dumiImage} width={40} height={40} objectFit="cover" />
        </div>

        <div className="w-full">
          <Input placeholder="댓글을 입력해주세요" style={{ background: '#fff' }} />
        </div>
      </div>
    </div>
  );
}

'use client';
import Image from 'next/image';
import emptyProfileImg from '@/assets/images/emptyProfileImg.jpeg';
import Camera from '@/assets/icons/camera.svg';
import Pencil from '@/assets/icons/pencilSimpleLine.svg';
import { Tab } from '@headlessui/react';
import { useEffect, useRef, useState } from 'react';
import {
  fetchCommentedDiveLog,
  fetchLikeDiveLog,
  fetchMyDiveLog,
  fetchUserDetail,
} from '@/apis/log';
import { MyPageLogData } from '@/types/log';
import Link from 'next/link';

export default function My() {
  const profileImageRef = useRef<HTMLImageElement | null>(null);
  const [userData, setUserData] = useState({
    id: 0,
    nickName: '',
    imageUri: '',
    email: '',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [myLogList, setMyLogList] = useState<MyPageLogData[]>([]);
  const [likeLogList, setLikeLogList] = useState<MyPageLogData[]>([]);
  const [commentLogList, setCommentLogList] = useState<MyPageLogData[]>([]);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    fetchUserData();

    const handleImageLoad = () => {
      setProfileLoaded(true);
    };

    if (profileImageRef.current) {
      profileImageRef.current.onload = handleImageLoad;
    }
  }, []);

  useEffect(() => {
    switch (selectedIndex) {
      case 1:
        fetchLikeLog();
        break;
      case 2:
        fetchCommentedLog();
        break;
      default:
        fetchMyLog();
    }
  }, [selectedIndex]);

  const fetchUserData = async () => {
    try {
      const res = await fetchUserDetail();
      setUserData(res);
    } catch (error) {
      console.log(error);
      alert('요청중에 에러가 발생하였습니다.');
    }
  };

  const fetchMyLog = async () => {
    try {
      const res = await fetchMyDiveLog();
      setMyLogList(res);
    } catch (error) {
      console.log(error);
      alert('내 로그를 받아오는데 실패하였습니다.');
    }
  };

  const fetchLikeLog = async () => {
    try {
      const res = await fetchLikeDiveLog();
      setLikeLogList(res);
    } catch (error) {
      console.log(error);
      alert('좋아요한 로그를 받아오는데 실패하였습니다.');
    }
  };

  const fetchCommentedLog = async () => {
    try {
      const res = await fetchCommentedDiveLog();
      setCommentLogList(res);
    } catch (error) {
      console.log(error);
      alert('댓글 단 로그를 받아오는데 실패하였습니다.');
    }
  };

  return (
    <div className=" px-4">
      <div className="flex flex-col justify-center items-center py-9">
        <div className="relative">
          {profileLoaded ? (
            <img
              ref={profileImageRef}
              alt="profile image"
              src={userData.imageUri}
              className=" rounded-[50px] w-[100px] h-[100px]"
            />
          ) : (
            <Image
              alt="profile default image"
              src={emptyProfileImg}
              width={100}
              height={100}
              className=" rounded-full"
            />
          )}
          <button className=" w-8 h-8 rounded-2xl flex justify-center items-center bg-[#d9d9d9] absolute bottom-0 right-0">
            <Camera />
          </button>
        </div>

        <div className=" flex items-center relative mt-5">
          <span>{userData.nickName}</span>
          <button className="absolute -right-7">
            <Pencil />
          </button>
        </div>
      </div>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List>
          <div className="flex items-center px-2 h-12 rounded-3xl bg-[#e9eaf4] gap-1">
            <Tab
              className={({ selected }) =>
                `flex justify-center items-center w-full h-9 rounded-[20px] outline-none ${
                  selected ? 'bg-[#567bff] text-white' : 'bg-white text-black'
                }`
              }
            >
              <span className="text-[15px]">내 로그</span>
            </Tab>
            <Tab
              className={({ selected }) =>
                `flex justify-center items-center w-full h-9 rounded-[20px] outline-none ${
                  selected ? 'bg-[#567bff] text-white' : 'bg-white text-black'
                }`
              }
            >
              <span className="text-[15px]">좋아요 한 로그</span>
            </Tab>
            <Tab
              className={({ selected }) =>
                `flex justify-center items-center w-full h-9 rounded-[20px] outline-none ${
                  selected ? 'bg-[#567bff] text-white' : 'bg-white text-black'
                }`
              }
            >
              <span className="text-[15px]">댓글 단 로그</span>
            </Tab>
          </div>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="grid gap-3 grid-cols-2 mt-8">
              {myLogList.map((myLog, idx) => (
                <Link
                  key={idx}
                  href={`/feed/detail/${myLog.divelogId}`}
                  className=" rounded-lg overflow-hidden"
                >
                  <Image
                    alt="feed image"
                    src={myLog.imageUri}
                    width={200}
                    height={200}
                    objectFit="cover"
                  />
                </Link>
              ))}
              <div className="h-40" />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid gap-3 grid-cols-2 mt-8">
              {likeLogList.map((likeLog, idx) => (
                <Link
                  key={idx}
                  href={`/feed/detail/${likeLog.divelogId}`}
                  className=" rounded-lg overflow-hidden"
                >
                  <Image
                    alt="feed image"
                    src={likeLog.imageUri}
                    width={200}
                    height={200}
                    objectFit="cover"
                  />
                </Link>
              ))}

              <div className="h-40" />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid gap-3 grid-cols-2 mt-8">
              {commentLogList.map((commentedLog, idx) => (
                <Link
                  key={idx}
                  href={`/feed/detail/${commentedLog.divelogId}`}
                  className=" rounded-lg overflow-hidden"
                >
                  <Image
                    alt="feed image"
                    src={commentedLog.imageUri}
                    width={200}
                    height={200}
                    objectFit="cover"
                  />
                </Link>
              ))}
              <div className="h-40" />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

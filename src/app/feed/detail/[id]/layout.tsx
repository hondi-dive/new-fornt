'use client';
import React from 'react';
import HeaderLayout from '@/layouts/HeaderLayout';
import Share from '@/assets/icons/share.svg';

interface LayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default function Layout({ children, params }: LayoutProps) {
  const positions = [
    {
      id: 1,
      title: '판포포구',
    },
    {
      id: 2,
      title: '월령포구',
    },
    {
      id: 3,
      title: '범섬',
    },
    {
      id: 4,
      title: '황우지선녀탕',
    },
    {
      id: 5,
      title: '김녕포구',
    },
    {
      id: 6,
      title: '김녕해변',
    },
    {
      id: 7,
      title: '중문해수욕장',
    },
    {
      id: 8,
      title: '함덕해변',
    },
    {
      id: 9,
      title: '이호테우해변',
    },
    {
      id: 10,
      title: '협재해변',
    },
  ];

  const spot = positions.find((position) => position.id === Number(params.id)) ?? { title: '' };

  const handleShare = () => {
    alert('서비스 준비중 입니다.');
  };
  return (
    <div className=" min-h-screen bg-[#567BFF]">
      <HeaderLayout
        title={spot.title}
        nextComponent={
          <button onClick={handleShare}>
            <Share />
          </button>
        }
      >
        <div className="h-screen w-full">{children}</div>
      </HeaderLayout>
    </div>
  );
}

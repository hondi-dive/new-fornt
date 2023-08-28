import { Inter } from 'next/font/google';

import type { Metadata } from 'next';
import DefaultLayout from '@/layouts/DefaultLayout';

import '@/styles/globals.css';
import '@/styles/reset.css';
import '@/styles/font.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '이거바당',
  description: '다이버 커뮤니티 플랫폼입니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <meta
        name="viewport"
        content="initial-scale=1.0,user0scalable=no,maximum-scale=1,width=device-width"
      />

      <body className={inter.className}>
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
}

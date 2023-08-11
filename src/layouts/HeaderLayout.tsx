'use client';
import Header from '@/components/common/Header';
import { PropsWithChildren } from 'react';

interface Props {
  title: string;
  backComponent?: JSX.Element;
  nextComponent?: JSX.Element;
  nextPath?: string;
  backPath?: string;
  disabled?: boolean;
}

export default function HeaderLayout({
  title,
  backComponent,
  nextComponent,
  nextPath,
  backPath,
  disabled,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="min-h-screen">
      <Header
        title={title}
        backComponent={!!backComponent ? backComponent : <Header.Back path={backPath} />}
        nextComponent={
          nextComponent ? (
            nextComponent
          ) : nextPath ? (
            <Header.Next disabled={!!disabled} path={nextPath}>
              다음
            </Header.Next>
          ) : undefined
        }
      />
      <div className="pt-16">{children}</div>
    </div>
  );
}

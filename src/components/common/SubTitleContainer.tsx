import { PropsWithChildren } from 'react';

interface Props {
  title: string;
}

export default function SubTitleContainer({ children, title }: PropsWithChildren<Props>) {
  return (
    <div className=" mt-5">
      <div>
        <h3 className=" font-medium text-[#7f7f7f]">{title}</h3>
      </div>
      <div className=" mt-3">{children}</div>
    </div>
  );
}

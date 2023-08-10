import { PropsWithChildren } from 'react';

interface Props {
  step: number;
  title: string;
}

export default function StepContainer({ step, title, children }: PropsWithChildren<Props>) {
  return (
    <div>
      <div className="flex items-center pb-3">
        <span className="text-[#567bff] font-extrabold">{`Step${step}`}</span>
        <h3 className=" ml-2 text-[17px] font-medium text-[#383838]">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
}

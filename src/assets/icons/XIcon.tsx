import * as React from 'react';
import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const XIcon = (props: Props) => {
  const { size = 29, color = '#fff' } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 29 29"
      fill="none"
      {...props}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M14.296 12.842 7.703 6.25a1.4 1.4 0 1 0-1.981 1.98l6.594 6.592-6.594 6.594a1.401 1.401 0 0 0 1.98 1.98l6.594-6.594 6.592 6.594a1.402 1.402 0 0 0 2.39-.99c0-.359-.136-.717-.409-.99l-6.594-6.594L22.87 8.23a1.398 1.398 0 0 0-.99-2.39 1.4 1.4 0 0 0-.99.41l-6.593 6.593Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default XIcon;

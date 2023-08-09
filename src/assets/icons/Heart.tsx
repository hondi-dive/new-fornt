import * as React from 'react';
import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  size: number;
  isFill: boolean;
}

const Heart = (props: Props) => {
  const { size, isFill } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 33 33"
      fill="none"
      {...props}
    >
      <g fill="#fff">
        <path d="M32.5.579H.5v32h32v-32Z" />
        <path
          stroke={isFill ? '#426BFF' : '#7F7F7F'}
          fill={isFill ? '#426BFF' : undefined}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16.5 27.579s-13-7-13-15.25a6.75 6.75 0 0 1 6.75-6.75c2.824 0 5.242 1.538 6.25 4 1.008-2.462 3.426-4 6.25-4a6.75 6.75 0 0 1 6.75 6.75c0 8.25-13 15.25-13 15.25Z"
        />
      </g>
    </svg>
  );
};
export default Heart;

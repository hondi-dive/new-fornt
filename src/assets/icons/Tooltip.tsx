import * as React from 'react';
import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  size?: number;
  isFill?: boolean;
}

const Tooltip = (props: Props) => {
  const { size = 21, isFill = false } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 21 22"
      fill="none"
      {...props}
    >
      <path
        fill={isFill ? '#327AEB' : undefined}
        stroke={isFill ? '#327AEB' : '#7f7f7f'}
        fillRule="evenodd"
        d="M10.5.572C4.701.572 0 4.845 0 10.116c0 2.539 1.098 4.84 2.876 6.55l-.868 4.269a.504.504 0 0 0 .434.6.499.499 0 0 0 .269-.046l4.731-2.243c.996.275 2.025.414 3.058.414 5.799 0 10.5-4.273 10.5-9.544C21 4.845 16.299.572 10.5.572Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Tooltip;

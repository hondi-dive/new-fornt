import Button from '@/components/common/Button';
import SubTitleContainer from '@/components/common/SubTitleContainer';
import React from 'react';

interface Props {
  title: string;
  selectedData: {
    selectedValue: string;
    displayValue: string;
    onClick: () => void;
  }[];
  value: string;
}

export default function LogDataSelector({ title, selectedData, value }: Props) {
  return (
    <SubTitleContainer title={title}>
      <div className="flex gap-3">
        {selectedData.map((datum, idx) => (
          <Button
            key={idx}
            size="small"
            color={value === datum.selectedValue ? 'secondary' : 'normal'}
            onClick={datum.onClick}
          >
            <span
              className={`font-medium ${
                value === datum.selectedValue ? 'text-white' : 'text-black'
              }`}
            >
              {datum.displayValue}
            </span>
          </Button>
        ))}
      </div>
    </SubTitleContainer>
  );
}

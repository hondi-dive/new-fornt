import CheckCircle from '@/assets/icons/CheckCircle.svg';

interface SelectActivitiesProps {
  snorkelActive: boolean;
  setSnorkelActive: React.Dispatch<React.SetStateAction<boolean>>;
  freedivingActive: boolean;
  setFreedivingActive: React.Dispatch<React.SetStateAction<boolean>>;
  scubaActive: boolean;
  setScubaActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SelectActivities({
  snorkelActive,
  setSnorkelActive,
  freedivingActive,
  setFreedivingActive,
  scubaActive,
  setScubaActive,
}: SelectActivitiesProps) {
  return (
    <div className="bg-[#E9EAF4] flex justify-between rounded-3xl py-2 px-2">
      <button
        onClick={() => {
          setSnorkelActive(!snorkelActive);
        }}
        className={`${
          snorkelActive
            ? 'bg-[#567BFF] text-white border-2 border-solid border-[#567BFF]'
            : 'border-[#92AAFD] border-2 border-solid bg-white text-[#7F7F7F]'
        } text-base outline-none flex items-center rounded-3xl py-1.5 px-2`}
      >
        스노클
        <CheckCircle color={snorkelActive ? 'white' : '#7F7F7F'} />
      </button>
      <button
        onClick={() => {
          setFreedivingActive(!freedivingActive);
        }}
        className={`${
          freedivingActive
            ? 'bg-[#567BFF] text-white border-2 border-solid border-[#567BFF]'
            : 'border-[#92AAFD] border-2 border-solid bg-white text-[#7F7F7F]'
        } text-base outline-none flex items-center rounded-3xl py-1.5 px-2`}
      >
        프리다이빙
        <CheckCircle color={freedivingActive ? 'white' : '#7F7F7F'} />
      </button>
      <button
        onClick={() => {
          setScubaActive(!scubaActive);
        }}
        className={`${
          scubaActive
            ? 'bg-[#567BFF] text-white border-2 border-solid border-[#567BFF]'
            : 'border-[#92AAFD] border-2 border-solid bg-white text-[#7F7F7F]'
        } text-base outline-none flex items-center rounded-3xl py-1.5 px-2`}
      >
        스쿠버다이빙
        <CheckCircle color={scubaActive ? 'white' : '#7F7F7F'} />
      </button>
    </div>
  );
}

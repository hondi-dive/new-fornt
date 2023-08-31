import ArrowDown from '@/assets/icons/arrowDown.svg';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';

type SelectData = {
  id: number | string;
  selectedValue: string;
  displayValue: string;
};

interface Props {
  data: SelectData[];
  value: SelectData | undefined;
  onChange: (value: SelectData) => void;
  disabled?: boolean;
  placeholder?: string;
  action?: (e: any) => void;
}

export default function Select({ data, value, onChange, disabled, placeholder, action }: Props) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative mt-1 w-full">
        <Listbox.Button
          className="relative h-[50px] flex items-center w-full border-[1px] border-[#d9d9d9] border-solid rounded-lg justify-center z-10"
          onClick={action}
        >
          <span className={`block truncate ${disabled ? 'text-[#7f7f7f]' : 'text-black'}`}>
            {value ? value.displayValue : placeholder}
          </span>
          <span className="absolute right-7">
            <ArrowDown />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-[9999]">
            {data.map((datum, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-blue-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={datum}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {datum.displayValue}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <ArrowDown />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

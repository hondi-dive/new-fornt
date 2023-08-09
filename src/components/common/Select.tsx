import ArrowDown from "@/assets/icons/arrowDown.svg"
import { HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLSelectElement> {}

export default function Select ({className,...rest}: Props) {
  return (
    <div
      className={`relative h-[50px] flex items-center w-full border-[1px] border-[#d9d9d9] border-solid rounded-lg justify-center ${className}`}
    >
      <select 
      
      className=' appearance-none outline-none text-[17px] text-black font-semibold disabled:text-[#7f7f7f] disabled:font-medium'
      {...rest}
      />
      <div className='absolute right-7'>
        <ArrowDown />
      </div>
    </div>
  )
}
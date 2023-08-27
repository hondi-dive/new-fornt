'use client';
import XIcon from '@/assets/icons/XIcon';
import Plus from '@/assets/icons/plus.svg';
import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';

interface Props {
  setImageForm: React.Dispatch<React.SetStateAction<FormData | undefined>>;
}

export default function ImageUploader({ setImageForm }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const windowSize = useWindowSize();
  const size = (windowSize?.width || 393) - 48;

  const [image, setImage] = useState('');

  const handleClick = () => {
    fileInputRef.current ? fileInputRef.current.click() : console.log('fileInput not created');
  };

  const handleImageReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setImage('');
    setImageForm(undefined);
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList: null | FileList = e.target.files;
    if (!fileList || !fileList[0]) return;

    const file = fileList[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (reader.readyState === 2) {
        setImage(e?.target?.result ? `${e.target.result}` : '');
      }
    };

    const formData = new FormData();
    formData.append('image', file);
    setImageForm(formData);
  };

  return (
    <div
      style={{ height: `${size}px`, width: `${size}px` }}
      className={`max-w-[345px] max-h-[345px] w-full h-full relative rounded-lg flex justify-center items-center bg-[#f3f4f9] overflow-hidden`}
    >
      <input
        type="file"
        name="image_url"
        onChange={handleUpload}
        ref={fileInputRef}
        className="hidden"
      />
      {image ? (
        <button
          aria-label="image clear button"
          className="w-[72px] h-[72px] rounded-full bg-[rgba(255,255,255,0.4)] absolute flex justify-center items-center z-50"
          onClick={handleImageReset}
        >
          <XIcon />
        </button>
      ) : (
        <button
          aria-label="image add button"
          className=" w-[72px] h-[72px] rounded-full bg-[#c9d6f2] absolute flex justify-center items-center"
          onClick={handleClick}
        >
          <Plus />
        </button>
      )}

      {image && <Image alt="upload image" src={image} fill={true} objectFit="cover" />}
    </div>
  );
}

import React from 'react';
import Image from 'next/image';

export default function InterviewHeader() {
  return (
    <div className='p-4 shadow-sm'>
        <Image src={'/logo.png'} alt="logo" width={200} height={200}
        className='w-[140px]'/>
    </div>
  )
}

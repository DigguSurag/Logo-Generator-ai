'use client'
import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import LogoTitleContent from '@/app/_data/LogoTitleContent'
import { useSearchParams } from 'next/navigation'

function LogoTitle({onHandleInputChange, formData}) {

    const searchParam = useSearchParams();
    const [title,setTitle] = useState(searchParam?.get('title')??'');

  return (
    <div className='my-12'>

      <HeadingDescription 
      title = {LogoTitleContent.LogoTitle}
      description = {LogoTitleContent.LogoTitleDesc}
      />

      <input type='text' placeholder= {LogoTitleContent.Placeholder}
      className='p-3 text-sm w-100 mt-8 border rounded-md shadow-md '
      defaultValue={title}
      onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
  )
}

export default LogoTitle

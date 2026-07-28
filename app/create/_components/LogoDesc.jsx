import React from 'react';
import HeadingDescription from './HeadingDescription';
import LogoTitleContent from '@/app/_data/LogoTitleContent';

function LogoDesc({onHandleInputChange, formData}) {
  return (
    <div className='my-12'>
      
      <HeadingDescription
        title={LogoTitleContent.LogoDesc}
        description={LogoTitleContent.LogoDescDesc}
      />

      <input type='text' placeholder= {LogoTitleContent.Placeholder}
            className='p-3 text-sm w-100 mt-8 border rounded-md shadow-md '
            defaultValue={formData?.desc}
            onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
  )
}

export default LogoDesc

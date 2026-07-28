'use client'
import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import LogoTitleContent from '@/app/_data/LogoTitleContent'
import LogoDesig from '@/app/_data/LogoDesig'
import Image from 'next/image'

function LogoDesigns({onHandleInputChange, formData}) {
  const [selectedOption, setSelectedOption] = useState(formData?.design?.title);

  return (
    <div className='my-12'>
      <HeadingDescription
        title={LogoTitleContent.DesignTitle}
        description={LogoTitleContent.DesignDesc}
      />

      <div className='grid lg: grid-cols-2 md:grid-cols-3 gap-10 mt-10'>
        {LogoDesig.map((design, index) => (
          <div key={index} onClick={() => {setSelectedOption(design.title);
            onHandleInputChange(design)}
          }
          className= {`p-1 hover:shadow-2xl rounded-xl cursor-pointer ${selectedOption==design.title&&'border-2 border-primary rounded'}`}>
            <Image
              src={design.image}
              alt={design.title}
              width={300}
              height={200}
              className='w-full rounded-xl h-70px object-cover'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogoDesigns
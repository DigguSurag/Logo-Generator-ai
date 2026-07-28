"use client"

import React, { useState } from 'react'
import HeroContent from '../_data/HeroContent'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Hero() {

  const [logoTitle, setLogoTitle] = useState('')

  return (

    <div className='flex items-center mt-32 flex-col gap-5 px-5'>

      <h2 className='text-primary text-5xl text-center font-bold'>
        {HeroContent.HeroHeading}
      </h2>

      <h2 className='text-5xl text-center font-bold'>
        {HeroContent.HeroSubheading}
      </h2>

      <p className='text-lg text-gray-500 text-center max-w-2xl'>
        {HeroContent.HeroDesc}
      </p>

      <div className='flex gap-6 w-full max-w-2xl mt-10'>
{/* 
        <input
          placeholder={HeroContent.inputField}
          className='flex-1 p-3 border rounded-md shadow-md'
          onChange={(event) => setLogoTitle(event.target.value)}
        /> */}
{/* 
        <Link href={'/create?title=' + logoTitle}>

          <Button className='flex-1 w-full p-6'>
            Generate Logo
          </Button>

        </Link> */}

      </div>

    </div>
  )
}

export default Hero
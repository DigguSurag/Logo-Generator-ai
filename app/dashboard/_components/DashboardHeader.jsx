'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'

function DashboardHeader() {

  const { user } = useUser()

  return (

    <div className='flex items-center justify-between mb-10'>

      <div>

        <h1 className='text-4xl font-bold'>
          Welcome{user?.firstName ? `, ${user.firstName}` : ''} 👋
        </h1>

        <p className='text-gray-500 mt-2'>
          Let's create something amazing today.
        </p>

      </div>

      <div className='flex items-center gap-4'>

      </div>

    </div>

  )
}

export default DashboardHeader
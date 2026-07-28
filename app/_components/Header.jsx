'use client'

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser
} from '@clerk/nextjs'

function Header() {

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { isSignedIn } = useUser()

  const startNewLogo = () => {

    localStorage.removeItem("generated-logo");
    localStorage.removeItem("logo-current-step");
    localStorage.removeItem("logo-form-data");

  }


  return (

    <div className='px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 shadow-sm flex justify-between items-center'>

      <Link href='/'>

        <Image
          src={'/logo.svg'}
          alt='logo'
          height={100}
          width={100}
          className='cursor-pointer'
        />

        <div className='text-sm text-gray-500'>
          AI Logo Generator
        </div>

      </Link>

      <div className='flex items-center gap-4'>

        {mounted && (
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        )}

        {!isSignedIn ? (

          <>

            <SignInButton mode='modal' asChild>

              <Button
                variant='outline'
                className='p-5'
                link href='/create'
              >
                Sign In
              </Button>

            </SignInButton>

            <SignUpButton mode='modal'>

              <Button className='p-5'>
                Get Started
              </Button>

            </SignUpButton>

          </>

        ) : (

          <>

            <Link
              href="/create"
              onClick={startNewLogo}
            >

              <Button className="p-5">
                Generate Logo
              </Button>

            </Link>

            <Link href="/dashboard">
              <Button variant="outline" className="p-5">
                Dashboard
              </Button>
            </Link>

            <UserButton />

          </>

        )}

      </div>

    </div>
  )
}

export default Header
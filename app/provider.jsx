"use client"
import React from 'react'
import Header from './_components/Header'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import PageTransition from "@/components/ui/PageTransition";

function Provider({ children }) {

    const { user } = useUser();

    useEffect(() => {
        user && CheckUserAuth();
    }, [user])

    //Save User Data
    const CheckUserAuth = async () => {
        //Save User to Database

        // const result = await axios.post('/api/users',{
        //     userName: user?.fullName,
        //     userEmail: user?.primaryEmailAddress?.emailAddress
        // })
        // console.log(result.data);
    }


    return (
        <div>
            <Header />
            <PageTransition>
                <div className='px-10 lg:px-32 xl:px-48 2xl:px-56'>
                    {children}
                </div>
            </PageTransition>
        </div>
    )
}

export default Provider
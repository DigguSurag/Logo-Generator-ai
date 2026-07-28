'use client'

import React, { useEffect, useState } from 'react'

import DashboardHeader from './_components/DashboardHeader'
import LogoCard from './_components/LogoCard'

import { useUser } from "@clerk/nextjs";

import { db } from "@/configs/FirebaseConfig";

import { toast } from "sonner"

import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    deleteDoc,
    doc
} from "firebase/firestore";

function Dashboard() {

    const [logos, setLogos] = useState([])
    const { user } = useUser();

    useEffect(() => {

        if (!user) return;

        const getLogos = async () => {

            try {

                const q = query(

                    collection(db, "logos"),

                    where("userId", "==", user.id),

                    orderBy("createdAt", "desc")

                );

                const snapshot = await getDocs(q);
                console.log(snapshot.docs);

                const data = snapshot.docs.map(doc => ({

                    id: doc.id,

                    ...doc.data()

                }));

                console.log(data);

                setLogos(data);

            }

            catch (err) {

                console.log(err);

            }

        };

        getLogos();

    }, [user]);

    const deleteLogo = async (id) => {

        try {

            await deleteDoc(doc(db, "logos", id));

            setLogos(
                logos.filter(
                    logo => logo.id !== id
                )
            );

            toast.success("Logo deleted successfully!");

        }

        catch (err) {

            console.log(err);
            
            toast.error("Failed to delete logo.");

        }

    }

    return (

        <div className='mt-10'>

            <DashboardHeader />

            <h2 className='text-2xl font-bold mt-8 mb-6'>
                Recent Logos
            </h2>

            {logos.length === 0 ? (

                <div className='border rounded-xl p-12 text-center'>

                    <h3 className='text-xl font-semibold'>
                        No logos yet
                    </h3>

                    <p className='text-gray-500 mt-2'>
                        Generate your first logo to see it here.
                    </p>

                </div>

            ) : (

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                    {logos.map((logo) => (

                        <LogoCard
                            key={logo.id}
                            logo={logo}
                            onDelete={deleteLogo}
                        />

                    ))}

                </div>

            )}

        </div>


    )
}

export default Dashboard
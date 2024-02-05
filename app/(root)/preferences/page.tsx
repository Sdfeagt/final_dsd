import PreferencesGrid from '@/app/(root)/preferences/components/preferencesgrid';
import ButtonBack from '@/components/buttonBack';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

const Preferences = async () => {
    const { userId } = auth()
    if (!userId) {
        redirect("/sign-in")
    }
    const currentPreferences = await prismadb.userPreference.findMany({
        where: {
            userId: userId
        },
    })


    return (
        <div className=" my-6">
            <div className='flex items-center justify-center mt-6 mb-10'>
                <ButtonBack location='/' />
                <div className='flex text-lg justify-center'>
                    Set your preferences!
                </div>
            </div>
            <PreferencesGrid currentPreferences={currentPreferences.map((p) => p.name)} />
        </div>
    );
}

export default Preferences;

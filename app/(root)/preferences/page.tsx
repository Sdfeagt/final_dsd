import PreferencesGrid from '@/app/(root)/preferences/components/preferencesgrid';
import ButtonBackLink from '@/components/buttonBackLink';
import prismadb from '@/lib/prismadb';
import { auth, clerkClient } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const Preferences = async () => {
    const { userId } = auth()
    if (!userId) {
        redirect("/sign-in")
    }
    const user = await clerkClient.users.getUser(userId);
    const mail = user.emailAddresses[0].emailAddress

    const currentPreferences = await prismadb.userPreference.findMany({
        where: {
            email: mail
        },
    })


    return (
        <div className=" my-6">
            <div className='flex items-center justify-center mt-6 mb-10'>
                <ButtonBackLink location='/' />
                <div className='flex text-lg justify-center'>
                    Set your preferences!
                </div>
            </div>
            <PreferencesGrid currentPreferences={currentPreferences.map((p) => p.name)} email={user.emailAddresses[0].emailAddress} />
        </div>
    );
}

export default Preferences;

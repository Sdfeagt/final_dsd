import PreferencesGrid from '@/components/preferences';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Preferences = () => {
    return (
        <div className=" my-6">
            <div className='flex items-center justify-center mt-6 mb-10'>
                <div className='absolute left-4 p-2 rounded-full bg-figmaLightDark'>
                    <Link href={`/`}>
                        <ArrowLeft />
                    </Link>
                </div>
                <div className='flex text-lg justify-center'>
                    Set your preferences!
                </div>
            </div>
            <PreferencesGrid />
        </div>
    );
}

export default Preferences;

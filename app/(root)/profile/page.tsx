import { UserProfile } from '@clerk/nextjs'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Profile = () => {
    return (
        <div>
            <div className='absolute right-4 p-2 mt-8 rounded-full bg-figmaLightDark z-10'>
                <Link href={`/`}>
                    <ArrowLeft />
                </Link>
            </div>
            <UserProfile routing="path" path="/profile" />
        </div>
    )
}

export default Profile
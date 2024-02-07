import ButtonBackLink from '@/components/buttonBackLink'
import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const Profile = () => {
    return (
        <div>
            <div className='absolute z-10 p-2 mt-8'><ButtonBackLink location='/' /></div>
            <UserProfile routing="path" path="/profile" />
        </div>
    )
}

export default Profile
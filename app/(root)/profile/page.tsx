import ButtonBackLink from '@/components/buttonBackLink'
import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const Profile = () => {
    return (
        <div>
            <ButtonBackLink location='/' />
            <UserProfile routing="path" path="/profile" />
        </div>
    )
}

export default Profile
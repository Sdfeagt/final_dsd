import { Trip } from '@prisma/client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { User } from '@clerk/nextjs/server'
import AddFriends from './addFriends'

interface TripOverviewProps {
    trip: Trip | null,
    user: User
}
const TripOverview: React.FC<TripOverviewProps> = ({ trip, user }) => {
    //TODO: Add the hotel chosen, and current participants and their status
    return (
        <div>
            <div className='flex items-center justify-center my-6'>
                <div className='absolute left-4 p-2 rounded-full bg-figmaLightDark'>
                    <Link href={`/`}>
                        <ArrowLeft />
                    </Link>
                </div>
                <div className='flex text-lg justify-center'>
                    Trip to {trip?.destination}
                </div>
            </div>

            <div className='flex justify-center'>
                {trip?.name}
            </div>
            <div className='relative flex justify-center'>
                <Image className="opacity-75 rounded-xl" alt="pic" src={`/${trip?.destination}.png`} width={200} height={100} />
            </div>

            <div className='bg-figmaDark rounded-xl m-2'>
                <div className='flex justify-between mx-4 pt-2 items-center'>
                    <p>Add more participants!</p>
                    <Image className='rounded-full' src={user.imageUrl} alt='userimage' width={48} height={48} />
                </div>
                <AddFriends />
            </div>
        </div>
    )
}

export default TripOverview
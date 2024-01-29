import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import AddFriends from './addFriends'
import ManageFriends from './manageFriends'
import { redirect, useRouter } from 'next/navigation';
import { ParticipantWithUserDetails } from '@/lib/types'
import { Calendar } from './ui/calendar'
import { Days, Trip } from '@prisma/client'
import { User } from '@clerk/nextjs/server'

interface TripOverviewProps {
    trip: Trip | null,
    trip_days: Days[],
    user: User,
    participants: ParticipantWithUserDetails[]
}

const TripOverview: React.FC<TripOverviewProps> = ({ trip, user, participants, trip_days }) => {
    //TODO: Add the hotel chosen, and current participants and their status
    if (!trip) {
        redirect("/")
    }
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
                <div className='flex justify-between mt-4'>
                    <AddFriends />
                    <ManageFriends participants={participants} tripOwnerID={trip.ownerId} />
                </div>
            </div>
            <div className='flex flex-col justify-center m-2 text-center'>
                <p className='text-sm'>Based on your preferences, we believe you&apos;ll like</p>
                <p className='flex justify-center text-semibold text-lg text-semibold'>Test hotel name</p>
            </div>
            <div className='flex flex-col justify-center m-2 text-center'>
                <p className='text-sm'>Taking into account your and your&apos;s friends free time, we suggest the trip takes place</p>
                <div className="flex flex-col justify-center h-1/2 mt-4">
                    <Calendar
                        mode="multiple"
                        selected={trip_days.map(day => day.day)}
                        className="rounded-md border"
                    />
                </div>
                {user.id === trip.ownerId ? <div className='my-6'><Link href={`/${trip.id}/manage`} className='bg-figmaGreen text-white text-lg rounded-full p-3 m-4'>Manage trip</Link></div> : <div></div>}

            </div>
        </div>
    )
}

export default TripOverview
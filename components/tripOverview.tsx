import { Days, IndividualTripData, Trip } from '@prisma/client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { User } from '@clerk/nextjs/server'
import AddFriends from './addFriends'
import ManageFriends from './manageFriends'
import { redirect } from 'next/navigation';

type ParticipantWithUserDetails = IndividualTripData & {
    firstname: string | null | undefined;
    lastname: string | null | undefined;
    imageUrl: string;
    personal_days: Days[];
};

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
                <AddFriends />
                <ManageFriends participants={participants} tripOwnerID={trip.ownerId} />
            </div>
            <div className='flex flex-col justify-center m-2'>
                <p className='text-sm'>Based on your preferences, we believe you&apos;ll like</p>
                <p className='flex justify-center text-semibold text-lg text-semibold'>Test hotel name</p>
            </div>
            <div className='flex flex-col justify-center m-2'>
                <p className='text-sm'>Taking into account your and your&apos;s friends free time, we suggest the trip takes place</p>
                <div className="flex flex-wrap justify-center text-semibold text-lg">
                    {trip_days.map(day => (
                        <div key={day.id} className="mr-2 mb-2">
                            {day.day.getDate()} {day.day.toLocaleString('en-us', { month: 'short' })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TripOverview
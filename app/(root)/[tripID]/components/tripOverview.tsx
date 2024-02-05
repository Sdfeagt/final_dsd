"use client"

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import ManageFriends from './manageFriends'
import { redirect, useRouter } from 'next/navigation';
import { ParticipantWithUserDetails } from '@/lib/types'
import { Calendar } from '../../../../components/ui/calendar'
import { Days, Trip } from '@prisma/client'
import AddFriendsManage from './addFriendsManage'
import { Button } from '../../../../components/ui/button'
import axios from 'axios'
import ButtonBackLink from '@/components/buttonBackLink'

interface TripOverviewProps {
    trip: Trip | null,
    trip_days: Days[],
    participants: ParticipantWithUserDetails[],
    userId: string,
    userMail: string,
    userImageURL: string,
}

const TripOverview: React.FC<TripOverviewProps> = ({ trip, participants, trip_days, userId, userMail, userImageURL }) => {
    if (!trip) {
        redirect("/")
    }
    const router = useRouter()

    const HandleDeleteUser = async () => {
        try {
            await axios.delete(`/api/trips/${trip.id}/updateUserDetails/${userMail}`)
            router.push("/")
        } catch (error) {

        }
    }

    return (
        <div>
            <div className='flex items-center justify-center my-6'>
                <ButtonBackLink location='/' />
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
            {userId === trip.ownerId ?
                <div className='bg-figmaDark rounded-xl m-2'>
                    <div className='flex justify-between mx-4 pt-2 items-center'>
                        <p>Add more participants!</p>
                        <Image className='rounded-full' src={userImageURL} alt='userimage' width={48} height={48} />
                    </div>
                    <div className='flex justify-between mt-4'>
                        <AddFriendsManage tripID={trip.id} participants={participants.map((p) => p.email)} />
                        <ManageFriends participants={participants} tripOwnerID={trip.ownerId} />
                    </div>
                </div> : <div></div>}

            <div className='flex flex-col justify-center m-2 text-center'>
                <p className='text-sm'>Based on your preferences, we believe you&apos;ll like</p>
                <p className='flex justify-center text-semibold text-lg text-semibold'>Test hotel name</p>
            </div>
            <div className='flex flex-col justify-center m-2 text-center'>
                {trip.budget_split ? <p className='text-sm'>Budget, splitted</p> : <p className='text-sm'>Budget, total</p>}
                <p className='flex justify-center text-semibold text-lg text-semibold'>{trip.budget} €</p>
            </div>
            <div className='flex flex-col justify-center m-2 text-center'>
                <p className='text-sm'>Taking into account your and your&apos;s friends free time, we suggest the trip takes place: </p>
                <div className="flex flex-col justify-center h-1/2 mt-4">
                    <Calendar
                        mode="multiple"
                        selected={trip_days.map(day => day.day)}
                        className="rounded-md border flex justify-center"
                    />
                </div>
                {userId === trip.ownerId ? <div className='my-6'><Link href={`/${trip.id}/manage`} className='bg-figmaGreen text-white text-lg rounded-full p-3 m-4'>Manage trip</Link></div>
                    :
                    <div>
                        <div className=' flex justify-center my-4'>
                            <Button variant="destructive" onClick={HandleDeleteUser} className=' text-white text-lg rounded-full px-14 py-4'>Leave trip</Button>
                        </div>
                    </div>}

            </div>
        </div>
    )
}

export default TripOverview
"use client"
import { Days, Trip } from '@prisma/client'
import { CalendarDays, Euro } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Slider } from '../../../../components/ui/slider'
import { cn } from '@/lib/utils'
import { Input } from '../../../../components/ui/input'
import Image from 'next/image'
import { Calendar } from '../../../../components/ui/calendar'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Button } from '../../../../components/ui/button'
import ButtonBackLink from '@/components/buttonBackLink'


interface AddDetailsProps {
    trip: Trip,
    trip_days: Days[],
    userEmail: string
}

const AddDetails: React.FC<AddDetailsProps> = ({ trip, trip_days, userEmail }) => {
    const [budget, setBudget] = useState(1000)
    const [days, setDays] = useState<Date[] | undefined>(trip_days.map(day => day.day));
    const router = useRouter()


    const changeBudgetSlide = (event: any) => {
        setBudget(event)
    }

    const changeBudgetInput = (event: any) => {
        setBudget(event.target.value)
    }

    const HadnleAddDetails = async () => {
        try {
            const trip_days = days
            await axios.patch(`/api/trips/${trip.id}/updateUserDetails/${userEmail}`, { trip_days, budget })
            router.refresh()
        } catch (error) {

        }
    }

    const HandleDeleteUser = async () => {
        try {
            await axios.delete(`/api/trips/${trip.id}/updateUserDetails/${userEmail}`,)
            router.push("/")
        } catch (error) {

        }
    }
    return (
        <div>
            <div className='flex items-center justify-center my-6'>
                <ButtonBackLink location='/' />
                <div className='flex text-lg justify-center'>
                    Add details to {trip.name} trip
                </div>
            </div>

            <div className='relative flex justify-center'>
                <Image className="opacity-75 rounded-xl" alt="pic" src={`/${trip.destination[0].toUpperCase() + trip.destination.slice(1)}.png`} width={200} height={100} />
            </div>

            <div className="flex items-center justify-between mt-4">
                <Euro />
                <div className='text-right mr-2'>
                    <p className="text-sm">What&apos;s your budget?</p>
                    {trip.budget_split ? <p className='text-sm'>Budget splitted equally</p> : <p className='text-sm'>Budget total</p>}
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <Slider
                    defaultValue={[budget]}
                    max={5000}
                    step={1}
                    className={cn("w-[90%]")}
                    onValueChange={changeBudgetSlide}
                    value={[budget]}
                />
            </div>
            <div className="flex items-center justify-around mt-10">
                <div className="flex items-center justify-center">
                    <div className="relative w-1/2">
                        <Input type="number" className="bg-figmaDark py-1 w-full mr-1 rounded-full border border-gray-300 pl-2 pr-8" onChange={changeBudgetInput} value={budget} />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <Euro />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center space-x-2 items-center">
                <div className="bg-figmaDark p-2 rounded-full">
                    <CalendarDays />
                </div>
                <p className="text-lg">
                    Add preferred days
                </p>
            </div>
            <div className="flex justify-center h-1/2">
                <Calendar
                    mode="multiple"
                    selected={days}
                    onSelect={setDays}
                    className="rounded-md border flex justify-center"
                />
            </div>
            <div className=' flex justify-center my-4'>
                <Link onClick={HadnleAddDetails} href={`/`} className='bg-figmaGreen text-white text-lg rounded-full px-14 py-4'>Complete</Link>
            </div>
            <div className=' flex justify-center my-4'>
                <Button variant="destructive" onClick={HandleDeleteUser} className=' text-white text-lg rounded-full px-14 py-4'>Remove trip</Button>
            </div>
        </div>
    )
}

export default AddDetails
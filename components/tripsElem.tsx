"use client"
import { Trip } from '@prisma/client'
import { MoreVertical } from 'lucide-react'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation';


interface TripsListProps {
    trip: Trip
}

const TripElem: React.FC<TripsListProps> = ({ trip }) => {
    const router = useRouter()

    const handleDelete = async () => {
        await axios.delete(`/api/trips/${trip.id}`)
        router.refresh()

    }
    return (
        <div className='flex items-center justify-between border-2 border-white rounded-lg bg-figmaDark m-4'>
            <div className='m-2'>
                <p>{trip.name}</p>
                <p>Trip to {trip.destination}</p>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVertical className='m-2' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem><Link href={`/${trip.id}`}>Show</Link></DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete()}><p>Delete</p></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default TripElem
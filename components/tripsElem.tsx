import { Trip } from '@prisma/client'
import { MoreVertical } from 'lucide-react'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import Link from 'next/link'
interface TripsListProps {
    trip: Trip
}

const TripElem: React.FC<TripsListProps> = ({ trip }) => {
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
                    <DropdownMenuItem><Link href={"/"}>Show</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href={"/"}>Delete</Link></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default TripElem
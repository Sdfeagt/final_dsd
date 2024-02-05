"use client"
import { Trip } from '@prisma/client'
import { MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../../components/ui/alert-dialog'

interface TripsListProps {
    trip: Trip,
    userId: string
}

const TripElem: React.FC<TripsListProps> = ({ trip, userId }) => {
    const router = useRouter()
    const [modal, setModal] = useState(false)

    const handleDelete = async () => {
        await axios.delete(`/api/trips/${trip.id}`)
        router.refresh()
        setModal(!modal)

    }
    return (
        <div>
            {userId === trip.ownerId ?
                <div className='flex items-center justify-between border-2 border-white rounded-lg bg-figmaDark m-4'>
                    <div className='m-2'>
                        <p>{trip.name}</p>
                        <p>Trip to {trip.destination}</p>
                    </div>
                    <DropdownMenu open={modal} onOpenChange={() => setModal(!modal)}>
                        <DropdownMenuTrigger>
                            <MoreVertical className='m-2' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent onClick={() => setModal(true)}>
                            <DropdownMenuItem><Link href={`/${trip.id}`}>Show</Link></DropdownMenuItem>
                            <DropdownMenuItem>
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <p>Delete</p>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete()}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                :
                <div className='flex items-center justify-between border-2 border-white rounded-lg bg-figmaDark m-4'>
                    <div className='m-2'>
                        <p>{trip.name}</p>
                        <p>Trip to {trip.destination}</p>
                    </div>
                    <MoreVertical className='m-2' onClick={() => router.push(`/${trip.id}`)} />
                </div>



            }

        </div>
    )
}

export default TripElem
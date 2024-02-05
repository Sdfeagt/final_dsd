"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { ParticipantWithUserDetails } from '@/lib/types';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ManageFriendsProps {
    participants: ParticipantWithUserDetails[],
    tripOwnerID: string,
}

const ManageFriends: React.FC<ManageFriendsProps> = ({ participants, tripOwnerID }) => {
    const [openModal, setOpenModal] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    function handleOutsideClick(event: any) {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
            setOpenModal(false);
        }
    }

    useEffect(() => {
        if (openModal) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [openModal])

    const removeParticipant = async (email: string) => {
        try {

        }
        catch (e) {
            console.log("Error: " + e);
        }
    }


    return (
        <Popover open={openModal}>
            <PopoverTrigger asChild>
                <div className='flex items-center '>
                    <Button onClick={() => setOpenModal(!openModal)} className='my-2 ml-2 rounded-full bg-figmaLightDark text-white text-semibold'>Manage participants</Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80" ref={popoverRef}>
                {participants.map(p => (
                    <div key={p.id} className='flex justify-between items-center border-2 rounded-lg border-white p-2'>
                        <Image className='rounded-full' src={p.imageUrl} alt='userimage' width={48} height={48} />
                        <p>{p.firstname}</p>
                        <div className='flex'>Confirmed: <div className='flex pl-2'>{(p.confirmed === true) ? <Check color='#24B24C' /> : <X color='#FF0000' />}</div></div>
                        {(p.userID !== tripOwnerID) ?
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Trash2 />
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
                                        <AlertDialogAction onClick={() => removeParticipant(p.email)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog> : <div></div>}
                    </div>
                ))}
            </PopoverContent>
        </Popover>
    );
};

export default ManageFriends;

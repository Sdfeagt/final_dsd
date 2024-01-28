"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Days, IndividualTripData } from '@prisma/client';

type ParticipantWithUserDetails = IndividualTripData & {
    firstname: string | null | undefined;
    lastname: string | null | undefined;
    imageUrl: string;
    personal_days: Days[];
    userID: string | null | undefined;
};

interface ManageFriendsProps {
    participants: ParticipantWithUserDetails[],
    tripOwnerID: string,
}

const ManageFriends: React.FC<ManageFriendsProps> = ({ participants, tripOwnerID }) => {
    const [openModal, setOpenModal] = useState(false);
    const [sent, setSent] = useState(false);
    const [fadeEffect, setFadeEffect] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    function handleOutsideClick(event: any) {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
            setOpenModal(false);
        }
    }

    // useEffect to add/remove event listener
    useEffect(() => {
        if (openModal) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            // Clean up the event listener
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [openModal])




    console.log(tripOwnerID);
    console.log(participants[0].id);
    return (
        <Popover open={openModal}>
            <PopoverTrigger asChild>
                <div className='flex items-center '>
                    <Button onClick={() => setOpenModal(!openModal)} className='my-2 ml-2 rounded-full bg-figmaLightDark text-white text-semibold'>Manage participants</Button>
                    {sent && !openModal && (
                        <div className={cn("flex transition-opacity duration-500", fadeEffect ? "opacity-100'" : "opacity-0")}>
                            <Check /> <p className='text-figmaGreen'>Message sent</p>
                        </div>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80" ref={popoverRef}>
                {participants.map(p => (
                    <div key={p.id} className='flex justify-between items-center border-2 rounded-lg border-white p-2'>
                        <Image className='rounded-full' src={p.imageUrl} alt='userimage' width={48} height={48} />
                        <p>{p.firstname}</p>
                        <div className='flex'>Confirmed: <div className='flex pl-2'>{(p.confirmed === true) ? <Check color='#24B24C' /> : <X color='#FF0000' />}</div></div>
                        {(p.userID !== tripOwnerID) ? <Trash2 /> : <div></div>}

                    </div>
                ))}
            </PopoverContent>
        </Popover>
    );
};

export default ManageFriends;

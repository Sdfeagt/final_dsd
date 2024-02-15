import TripOverview from '@/app/(root)/[tripID]/components/tripOverview'
import prismadb from '@/lib/prismadb'
import { auth, clerkClient } from '@clerk/nextjs'
import React, { use } from 'react'
import { redirect } from 'next/navigation';
import { User } from '@clerk/nextjs/server'
import { Days, IndividualTripData } from '@prisma/client';
import AddDetails from '@/app/(root)/[tripID]/components/addDetails';


interface TripPageProps {
    params: { tripID: string }
}

type ParticipantWithUserDetails = IndividualTripData & {
    firstname: string | null | undefined;
    lastname: string | null | undefined;
    imageUrl: string;
    personal_days: Days[];
    userID: string | null | undefined;
};


const TripPage: React.FC<TripPageProps> = async ({ params }) => {
    const { userId } = auth()
    if (!userId) {
        redirect("/sign-in")
    }
    const user = await clerkClient.users.getUser(userId);
    if (!user) {
        redirect("/")
    }

    const trip = await prismadb.trip.findUnique({
        where: {
            id: params.tripID
        },
        include: {
            days: true,
            participantsEmail: true
        }
    })
    if (!trip) {
        redirect("/")
    }
    const participants = await prismadb.individualTripData.findMany({
        where: {
            tripId: params.tripID
        },
        include: {
            personal_days: true
        }
    })

    const userParticipant = await prismadb.individualTripData.findFirst({
        where: {
            tripId: params.tripID,
            email: user.emailAddresses[0].emailAddress
        }
    })

    const users: User[] = await clerkClient.users.getUserList({ emailAddress: participants.map(p => p.email) })

    const participantsWithUserDetails: ParticipantWithUserDetails[] = participants.map(participant => {
        const user = users.find(u => u.emailAddresses[0].emailAddress === participant.email);
        return {
            ...participant,
            firstname: user?.firstName,
            lastname: user?.lastName,
            imageUrl: user?.imageUrl ? user.imageUrl : "",
            userID: user?.id
        };
    });





    return (
        <div>
            {userParticipant?.confirmed ? <TripOverview trip={trip} participants={participantsWithUserDetails} trip_days={trip.days} userId={user.id} userImageURL={user.imageUrl} userMail={user.emailAddresses[0].emailAddress} />

                :
                <AddDetails trip={trip} trip_days={trip.days} userEmail={user.emailAddresses[0].emailAddress} />
            }


        </div>
    )
}

export default TripPage
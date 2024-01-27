import TripOverview from '@/components/tripOverview'
import prismadb from '@/lib/prismadb'
import { auth, clerkClient } from '@clerk/nextjs'
import React from 'react'
import { redirect } from 'next/navigation';

interface TripPageProps {
    params: { tripID: string }
}
const TripPage: React.FC<TripPageProps> = async ({ params }) => {
    const { userId } = auth()
    if (!userId) {
        redirect("/sign-in")
    }
    const user = await clerkClient.users.getUser(userId);
    const trip = await prismadb.trip.findUnique({
        where: {
            id: params.tripID
        }
    })
    return (
        <div>
            <TripOverview trip={trip} user={user} />

        </div>
    )
}

export default TripPage
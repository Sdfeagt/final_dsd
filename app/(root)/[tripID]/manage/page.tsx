import ManageTrip from "@/app/(root)/[tripID]/manage/components/manageTrip";
import ButtonBack from "@/components/buttonBack";
import prismadb from "@/lib/prismadb";
import { auth, clerkClient } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ManageTripPageProps {
    params: { tripID: string }
}

const ManageTripPage: React.FC<ManageTripPageProps> = async ({ params }) => {
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

    if (userId !== trip.ownerId) {
        redirect("/")
    }

    const dest = await prismadb.destination.findMany()
    return (
        <div>
            <div className='flex items-center justify-center my-6'>
                <ButtonBack location={`/${params.tripID}`} />
                <div className='flex text-lg justify-center'>
                    Manage your trip
                </div>
            </div>
            <ManageTrip trip={trip} days={trip.days} destinations={dest} />
        </div>
    )
}

export default ManageTripPage
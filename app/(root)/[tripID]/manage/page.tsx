import prismadb from "@/lib/prismadb";
import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ManageTripPageProps {
    params: { tripID: string }
}

const ManageTrip: React.FC<ManageTripPageProps> = async ({ params }) => {
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
    return (
        <div>ManageTrip</div>
    )
}

export default ManageTrip
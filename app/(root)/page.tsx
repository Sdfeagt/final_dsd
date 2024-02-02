import MainNav from "@/components/main_navbar";
import StartTrip from "@/components/start_Trip";
import TripElem from "@/components/tripsElem";
import prismadb from "@/lib/prismadb";
import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";



export default async function Home() {
    const { userId } = auth()
    if (!userId) {
        redirect("/sign-in")
    }

    const user = await clerkClient.users.getUser(userId);

    const trips = await prismadb.trip.findMany({
        where: {
            participantsEmail: {
                some: {
                    participantEmail: user.emailAddresses[0].emailAddress
                }
            },
        },
        include: {
            participantsEmail: true
        }
    });
    // console.log(trips.map((p) => p.participantsEmail));
    return (
        <div className="flex flex-col bg-black h-screen">
            <div className="mx-4 my-6">
                <MainNav />
            </div>
            {trips.map(trip => (
                <TripElem trip={trip} key={trip.id} />
            ))}
            <StartTrip />
            <Toaster />
        </div>
    )
}

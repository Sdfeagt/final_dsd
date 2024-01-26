import MainNav from "@/components/main_navbar";
import StartTrip from "@/components/start_Trip";
import TripElem from "@/components/tripsElem";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";



export default async function Home() {
    const { userId } = auth()
    if (!userId) {
        redirect("/sign-in")
    }
    const trips = await prismadb.trip.findMany({
        where: {
            participantsID: {
                some: {
                    participantID: userId
                }
            }
        }
    });
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

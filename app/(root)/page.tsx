import MainNav from "@/components/main_navbar";
import StartTrip from "@/components/start_Trip";
import { Toaster } from "react-hot-toast";



export default function Home() {


    return (
        <div className="flex flex-col bg-black h-screen">
            <div className="mx-4 my-6">
                <MainNav />
            </div>
            <StartTrip />
            <Toaster />
        </div>
    )
}

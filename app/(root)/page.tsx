import MainNav from "@/components/main_navbar";
import StartTrip from "@/components/ui/start_Trip";



export default function Home() {

    return (
        <div className="flex flex-col bg-black h-screen">
            <div className="mx-4 my-6">
                <MainNav />
            </div>
            <StartTrip />
        </div >
    )
}

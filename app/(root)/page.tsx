import MainNav from "@/components/main_navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Location from "@/public/location.svg"
import Search from "@/public/search.svg"


export default function Home() {
    return (
        <div className="flex flex-col bg-black h-screen">
            <div className="mx-4 my-6">
                <MainNav />
            </div>
            <div className="flex justify-center absolute bottom-0 w-full mb-8">
                <Button className="py-8 bg-figmaGreen rounded-full flex justify-between space-x-6">
                    <div className="flex space-x-2">
                        <div className="bg-figmaLightGreen rounded-full p-2">
                            <Image src={Location} alt="location" />
                        </div>
                        <div className="flex flex-col text-left	">
                            <p className="text-xs text-gray-300">Search by</p> <p className="text-lg font-semibold">location</p>
                        </div>
                    </div>
                    <div className="bg-figmaLightGreen rounded-full p-2">
                        <Image src={Search} alt="search" />
                    </div>

                </Button>
            </div>
        </div>
    )
}

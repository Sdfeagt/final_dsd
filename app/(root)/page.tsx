import MainNav from "@/components/main_navbar";
import { MapPin, Search, Banknote, Settings2 } from "lucide-react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



export default function Home() {


    return (
        <div className="flex flex-col bg-black h-screen">
            <div className="mx-4 my-6">
                <MainNav />
            </div>
            <div className="flex justify-center absolute bottom-0 w-full mb-8">
                <div className="py-4 bg-figmaGreen rounded-full flex flex-col justify-between items-center relative">
                    <p className="absolute top-1 left-50 text-sm text-gray-300">Search in...</p>
                    <div className="flex">
                        <div className="m-2 flex flex-col items-center">
                            <Select defaultValue="Location" >
                                <SelectTrigger className="w-[180px] bg-figmaGreen border-figmaGreen">
                                    <SelectValue placeholder="Search..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup className="bg-figmaGreen border-figmaGreen" >
                                        <SelectItem className="bg-figmaGreen border-figmaGreen" value="Location">
                                            <div className="flex items-center justify-between">
                                                <div className="bg-figmaLightGreen rounded-full p-1 mr-4 flex items-center">
                                                    <MapPin color="white" />
                                                </div>
                                                Location
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="Budget">
                                            <div className="flex items-center justify-between">
                                                <div className="bg-figmaLightGreen rounded-full p-1 mr-4 flex items-center">
                                                    <Banknote color="white" />
                                                </div>
                                                Budget
                                            </div>

                                        </SelectItem>
                                        <SelectItem value="Preferences">
                                            <div className="flex items-center justify-between">
                                                <div className="bg-figmaLightGreen rounded-full p-1 mr-4 flex items-center">
                                                    <Settings2 color="white" />
                                                </div>
                                                Preferences
                                            </div>
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="bg-figmaLightGreen rounded-full p-2 m-2 flex items-center">
                            <Search color="white" />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

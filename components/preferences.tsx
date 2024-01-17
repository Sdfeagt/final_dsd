"use client"
import { Dumbbell, Briefcase, Dog, Bike, Fan, Wifi, MonitorCheck, ChefHat, SunMoon, Gem, Banknote, Star } from 'lucide-react';
import { cn } from '@/lib/utils'
import { useState } from 'react';
import Link from 'next/link';

const PreferencesGrid = () => {
    const [clicked, setClicked] = useState<string[] | []>([])

    const handleClick = (icon: string) => {
        const arrlen = clicked.filter((i) => i === icon).length

        if (arrlen === 0) {
            //first click
            setClicked(prev => [...prev, icon])
        }
        else {
            //unclick
            setClicked(prev => prev.filter(i => i !== icon))
        }
    }
    return (
        <div className='flex justify-center items-center'>
            <div className="inline-grid grid-cols-3 gap-8">
                <div className='text-center text-sm' onClick={() => handleClick("gym")}>
                    <div className='flex justify-center'>
                        <div className={cn(" rounded-full flex justify-center items-center w-16 h-16", clicked.filter(i => i === "gym").length === 1 ? "bg-figmaGreen" : "bg-figmaLightDark")}><Dumbbell className="w-8 h-8 text-white" /></div>
                    </div>
                    Gym
                </div>

                <div className='text-center text-sm' onClick={() => handleClick("work")}>
                    <div className='flex justify-center'>
                        <div className={cn(" rounded-full flex justify-center items-center w-16 h-16", clicked.filter(i => i === "work").length === 1 ? "bg-figmaGreen" : "bg-figmaLightDark")}><Briefcase className="w-8 h-8 text-white" /></div>
                    </div>
                    Co-Working space
                </div>

                <div className="text-center text-sm" onClick={() => handleClick("pet")}>
                    <div className='flex justify-center'>
                        <div className={cn(" rounded-full flex justify-center items-center w-16 h-16", clicked.filter(i => i === "pet").length === 1 ? "bg-figmaGreen" : "bg-figmaLightDark")}><Dog className="w-8 h-8 text-white" /></div>
                    </div>
                    Pet friendly
                </div>

                <div className="text-center text-sm" onClick={() => handleClick("bike")}>
                    <div className='flex justify-center'>
                        <div className={cn(" rounded-full flex justify-center items-center w-16 h-16", clicked.filter(i => i === "bike").length === 1 ? "bg-figmaGreen" : "bg-figmaLightDark")}><Bike className="w-8 h-8 text-white" /></div>
                    </div>
                    Bike rental
                </div>

                <div className="text-center text-sm" onClick={() => handleClick("ac")}>
                    <div className='flex justify-center'>
                        <div className={cn(" rounded-full flex justify-center items-center w-16 h-16", clicked.filter(i => i === "ac").length === 1 ? "bg-figmaGreen" : "bg-figmaLightDark")}><Fan className="w-8 h-8 text-white" /></div>
                    </div>
                    AC
                </div>

                <div className="text-center text-sm" onClick={() => handleClick("wifi")}>
                    <div className='flex justify-center'>
                        <div className={cn(" rounded-full flex justify-center items-center w-16 h-16", clicked.filter(i => i === "wifi").length === 1 ? "bg-figmaGreen" : "bg-figmaLightDark")}><Wifi className="w-8 h-8 text-white" /></div>
                    </div>
                    Free Wi-Fi
                </div>

                <div className="text-center text-sm" onClick={() => handleClick("tv")}>
                    <div className='flex justify-center'>
                        <div className={cn(" rounded-full flex justify-center items-center w-16 h-16", clicked.filter(i => i === "tv").length === 1 ? "bg-figmaGreen" : "bg-figmaLightDark")}><MonitorCheck className="w-8 h-8 text-white" /></div>
                    </div>
                    TV included
                </div>

                <div className="text-center text-sm" onClick={() => handleClick("restaurant")}>
                    <div className='flex justify-center'>
                        <div className={cn(" rounded-full flex justify-center items-center w-16 h-16", clicked.filter(i => i === "restaurant").length === 1 ? "bg-figmaGreen" : "bg-figmaLightDark")}><ChefHat className="w-8 h-8 text-white" /></div>
                    </div>
                    On-site restaurant
                </div>

                <div className="text-center text-sm" onClick={() => handleClick("247")}>
                    <div className='flex justify-center'>
                        <div className={cn(" rounded-full flex justify-center items-center w-16 h-16", clicked.filter(i => i === "247").length === 1 ? "bg-figmaGreen" : "bg-figmaLightDark")}><SunMoon className="w-8 h-8 text-white" /></div>
                    </div>
                    24/7 reception
                </div>

                <div className="text-center text-sm" onClick={() => handleClick("star")}>
                    <div className='flex justify-center'>
                        <div className={cn(" rounded-full flex justify-center items-center w-16 h-16", clicked.filter(i => i === "star").length === 1 ? "bg-figmaGreen" : "bg-figmaLightDark")}><Gem className="w-8 h-8 text-white" /></div>
                    </div>
                    Luxury hotel
                </div>

                <div className="text-center text-sm" onClick={() => handleClick("budget")}>
                    <div className='flex justify-center'>
                        <div className={cn(" rounded-full flex justify-center items-center w-16 h-16", clicked.filter(i => i === "budget").length === 1 ? "bg-figmaGreen" : "bg-figmaLightDark")}><Banknote className="w-8 h-8 text-white" /></div>
                    </div>
                    Budget-friendly
                </div>

                <div className="text-center text-sm" onClick={() => handleClick("5star")}>
                    <div className='flex justify-center'>
                        <div className={cn(" rounded-full flex justify-center items-center w-16 h-16", clicked.filter(i => i === "5star").length === 1 ? "bg-figmaGreen" : "bg-figmaLightDark")}><Star className="w-8 h-8 text-white" /></div>
                    </div>
                    5-star hotel
                </div>

            </div>

            {clicked.length !== 0 ? (
                <div className='fixed inset-x-0 bottom-12 flex justify-center'>
                    <Link href={`/`} className='bg-figmaGreen text-white text-lg rounded-full px-14 py-4'>Complete</Link>
                </div>
            ) :
                <div></div>}
        </div >
    )
}

export default PreferencesGrid
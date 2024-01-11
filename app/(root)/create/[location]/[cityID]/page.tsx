import React from 'react'
import prismadb from '@/lib/prismadb'
import Image from 'next/image'

import { ArrowLeft } from 'lucide-react'
import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import BudgetDecision from '@/components/ui/budgetDecision';



interface DetailsPageProps {
    params: { location: string, cityID: string }
}


const DetailsPage: React.FC<DetailsPageProps> = async ({ params }) => {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }
    const user = await clerkClient.users.getUser(userId);

    const findCity = await prismadb.destination.findUnique({
        where: {
            id: params.cityID
        }
    })

    if (findCity === null) {
        return (
            <div>Critical error</div>
        )
    }

    const city = findCity

    return (
        <div>

            <div className='flex items-center justify-center my-6'>
                <div className='absolute left-5 p-2 rounded-full bg-figmaLightDark'>
                    <ArrowLeft />
                </div>
                <div className='text-lg'>
                    Create a new trip
                </div>
            </div>
            <div className='relative flex justify-center'>

                <p className='absolute top-0 left-1/2 z-10 transform -translate-x-1/2 text-center font-bold'>
                    {city.name}
                </p>
                <Image className="opacity-75 rounded-xl" alt={city.name} src={`/${city.name}.png`} width={200} height={100} />
            </div>
            <div className='bg-figmaDark rounded-xl m-2'>
                <div className='flex justify-between mx-4 pt-2 items-center'>
                    <p>Who&apos;s coming?</p>
                    <Image className='rounded-full' src={user.imageUrl} alt='userimage' width={48} height={48} />
                </div>
                <Button className=' my-2 ml-2 rounded-full bg-figmaLightDark text-white text-semibold'>+ Add Friends</Button>
            </div>
            <BudgetDecision />

        </div>

    )
}

export default DetailsPage
import React from 'react'
import prismadb from '@/lib/prismadb'
import Image from 'next/image'
import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import BudgetDecision from '@/app/(root)/create/[location]/[cityID]/components/budgetDecision';
import AddFriends from '@/app/(root)/create/[location]/[cityID]/components/addFriends';
import ButtonBack from '@/components/buttonBack';



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
                <div className='absolute left-4 p-2 rounded-full bg-figmaLightDark'>
                    <ButtonBack location={params.location} />
                </div>
                <div className='text-lg justify-center'>
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
                <AddFriends userMail={user.emailAddresses[0].emailAddress} />
            </div>
            <BudgetDecision destination={city} userId={userId} userEmail={user.emailAddresses[0].emailAddress} />

        </div>

    )
}

export default DetailsPage
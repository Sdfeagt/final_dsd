import { Button } from '@/components/ui/button'
import Destinations from '@/components/ui/destinations'
import { Input } from '@/components/ui/input'
import prismadb from '@/lib/prismadb'
import { MapPin, Search } from 'lucide-react'
import Image from 'next/image'

interface LocationPageProps {
    params: { location: string }
}

const Location: React.FC<LocationPageProps> = async ({ params }) => {

    const destinationsFilter = await prismadb.destination.findMany({
        where: {
            continent: params.location
        }
    })

    return (
        <div>
            <div className='text-lg flex justify-center my-6'>Where are you travelling to?</div>
            <div className="flex items-center rounded-full bg-figmaDark my-4 py-2">
                <div className="bg-figmaLightGreen rounded-full p-2 m-2 flex items-center">
                    <MapPin color="white" />
                </div>
                <Input type="search" placeholder="Search..." className='bg-figmaDark text-lg' />
                <Button type="submit" className="bg-figmaLightDark rounded-full p-2 m-2 flex items-center">
                    <Search color="white" />
                </Button>
            </div>
            <div className='text-sm text-gray-400 mt-14 mb-4'>Popular destinations in {params.location}</div>
            <Destinations destinations={destinationsFilter} />
        </div>
    )
}

export default Location
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MapPin, Search } from 'lucide-react'
import React from 'react'

interface LocationPageProps {
    params: { location: string }
}

const Location: React.FC<LocationPageProps> = ({ params }) => {
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
            <div className='text-sm text-gray-400 mt-14'>Popular destinations in {params.location}</div>
        </div>
    )
}

export default Location
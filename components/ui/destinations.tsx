import React from 'react'
import Image from 'next/image'

type Destination = {
    name: string,
    id: string,

}
interface DestinationsProps {
    destinations: Destination[],
}
const Destinations: React.FC<DestinationsProps> = ({ destinations }) => {
    return (
        <div className='inline-grid grid-cols-2 gap-4'>
            {destinations.map((dest) =>
                <div key={dest.id} className='relative'>
                    <p className='absolute top-0 left-1/2 z-10 transform -translate-x-1/2 text-center font-bold'>
                        {dest.name}
                    </p>
                    <Image className='opacity-75 rounded-xl' alt={dest.name} src={`/${dest.name}.png`} width={200} height={120} />
                </div>
            )}
        </div>
    )
}

export default Destinations
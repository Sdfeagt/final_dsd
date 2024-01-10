import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './button'


type Destination = {
    name: string,
    id: string,

}
interface DestinationGridProps {
    gridDestinations: Destination[]
}

const DestinationGrid: React.FC<DestinationGridProps> = ({ gridDestinations }) => {
    const [selectedId, setSelectedId] = useState("");

    const handleClick = (id: string) => {
        if (id === selectedId) {
            setSelectedId("")
        }
        else {
            setSelectedId(id)
        }
    }
    return (
        <div className='inline-grid grid-cols-2 gap-4'>
            {gridDestinations.length > 0 ? (
                gridDestinations.map((dest) =>
                    <div key={dest.id} className='relative' onClick={() => handleClick(dest.id)}>
                        <p className='absolute top-0 left-1/2 z-10 transform -translate-x-1/2 text-center font-bold'>
                            {dest.name}
                        </p>
                        <Image className={cn("opacity-75 rounded-xl", selectedId === dest.id ? "border-2 border-white" : "")} alt={dest.name} src={`/${dest.name}.png`} width={200} height={200} />
                    </div>
                )
            ) : (
                <p className='col-span-2 text-center text-sm text-gray-400'>No destinations fit your search :(</p>
            )}
            {selectedId !== "" ? (
                <div className='fixed inset-x-0 bottom-12 flex justify-center'>
                    <Button className='bg-figmaGreen text-white text-lg rounded-full px-14 py-6'>Next</Button>
                </div>
            ) :
                <div></div>}
        </div>
    )
}

export default DestinationGrid
"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, MapPin, Search } from 'lucide-react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import DestinationGrid from './destinationGrid'
import Link from 'next/link'
import ButtonBack from '@/components/buttonBack'

type Destination = {
    name: string,
    id: string,

}
interface DestinationsProps {
    destinations: Destination[],
    location: string,
}

const FormSchema = z.object({
    dest: z.string(),
})

const Destinations: React.FC<DestinationsProps> = ({ destinations, location }) => {
    const [filtered, setFiltered] = useState(destinations)
    const [correctedLocation, setCorrectedLocation] = useState(location)

    useEffect(() => {
        if (location == "NorthAmerica") {
            setCorrectedLocation("North America")
        }

    }, [location])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            dest: "",
        },
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log("***");
        console.log("data: " + data.dest);
        console.log("Before set: " + filtered.length);
        setFiltered(destinations)
        console.log("After set: " + filtered.length);
        if (data.dest != "") {
            setFiltered(destinations.filter((dest) => dest.name.toLowerCase().includes(data.dest.toLowerCase())))
        }
    }
    return (
        <div>
            <div className='flex items-center justify-center my-6'>
                <ButtonBack location='/' />
                <div className='flex text-lg justify-center'>
                    Where are you travelling to?
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center rounded-full bg-figmaDark my-4 py-2">
                    <div className="bg-figmaLightGreen rounded-full p-2 m-2 flex items-center">
                        <MapPin color="white" />
                    </div>
                    <FormField
                        control={form.control}
                        name="dest"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="search" placeholder="Search..." className='bg-figmaDark text-lg border-0' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-figmaLightDark rounded-full p-2 m-2 flex items-center">
                        <Search color="white" />
                    </Button>
                </form>
            </Form>
            <div className='text-sm text-gray-400 mt-14 mb-4'>
                Popular destinations in {correctedLocation}
            </div>
            <DestinationGrid gridDestinations={filtered} continent={location} />
        </div>
    )
}

export default Destinations
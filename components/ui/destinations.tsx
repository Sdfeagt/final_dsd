"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MapPin, Search } from 'lucide-react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"

type Destination = {
    name: string,
    id: string,

}
interface DestinationsProps {
    destinations: Destination[],
    location: string


}

const FormSchema = z.object({
    dest: z.string(),
})

const Destinations: React.FC<DestinationsProps> = ({ destinations, location }) => {
    const [filtered, setFiltered] = useState(destinations)

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
            <div className='text-lg flex justify-center my-6'>Where are you travelling to?
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
                                    <Input type="search" placeholder="Search..." className='bg-figmaDark text-lg' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-figmaLightDark rounded-full p-2 m-2 flex items-center">
                        <Search color="white" />
                    </Button>
                </form>
            </Form>
            <div className='text-sm text-gray-400 mt-14 mb-4'>Popular destinations in {location}
            </div>
            <div className='inline-grid grid-cols-2 gap-4'>
                {filtered.length > 0 ? (
                    filtered.map((dest) =>
                        <div key={dest.id} className='relative'>
                            <p className='absolute top-0 left-1/2 z-10 transform -translate-x-1/2 text-center font-bold'>
                                {dest.name}
                            </p>
                            <Image className='opacity-75 rounded-xl' alt={dest.name} src={`/${dest.name}.png`} width={200} height={120} />
                        </div>
                    )
                ) : (
                    <p className='col-span-2 text-center text-sm text-gray-400'>No destinations fit your search :(</p>
                )}
            </div>
        </div>
    )
}

export default Destinations
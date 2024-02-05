"use client"
import { Days, Destination, Trip } from '@prisma/client'
import React, { useEffect, useRef, useState } from 'react'
import { Calendar } from '../../../../../components/ui/calendar'
import { Check, Settings } from 'lucide-react'


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../../../components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '../../../../../components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../../../../../components/ui/command'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const FormSchemaName = z.object({
    tripname: z.string().min(4, {
        message: "Name must have at least 4 characters.",
    }),
})

const FormSchemaBudget = z.object({
    budget: z.coerce.number().min(1, {
        message: "Too low budget"
    }).max(5000, {
        message: "Too high budget"
    })
})

interface ManageTripProps {
    trip: Trip,
    days: Days[],
    destinations: Destination[]
}
const ManageTrip: React.FC<ManageTripProps> = ({ trip, days, destinations }) => {

    const [openModalName, setOpenModalName] = useState(false);
    const [tripName, setTripName] = useState(trip.name)

    const [openModalDest, setOpenModalDest] = useState(false);
    const [destVal, setDestVal] = useState(trip.destination)

    const [openModalBudget, setOpenModalBudget] = useState(false);
    const [budget, setBudget] = useState(trip.budget)

    const [splitString, setSplitString] = useState(trip.budget_split)
    const [openModalSplit, setOpenModalSplit] = useState(false)

    const [tripDays, setTripDays] = useState<Date[] | undefined>(days.map(day => day.day));


    const router = useRouter()
    const popoverRef = useRef<HTMLDivElement>(null);


    const formName = useForm<z.infer<typeof FormSchemaName>>({
        resolver: zodResolver(FormSchemaName),
        defaultValues: {
            tripname: trip.name,
        },
    })
    const onSubmitName = (data: z.infer<typeof FormSchemaName>) => {
        setOpenModalName(false);
        setTripName(data.tripname)
        formName.reset();
    }

    const formBudget = useForm<z.infer<typeof FormSchemaBudget>>({
        resolver: zodResolver(FormSchemaBudget),
        defaultValues: {
            budget: trip.budget
        }
    })
    const onSubmitBudget = (data: z.infer<typeof FormSchemaBudget>) => {
        setOpenModalBudget(false);
        setBudget(data.budget)
        formName.reset();
    }

    const handlechanges = async () => {
        console.log(tripName);
        try {
            await axios.patch(`/api/trips/${trip.id}`, { tripName, destVal, budget, splitString, tripDays })
            router.push(`/${trip.id}`)
        } catch (error) {
            console.log("Error: " + error);
        }
    }


    return (
        <div>
            <div className='grid grid-cols-1 gap-y-4 text-lg text-semibold'>
                <div className='flex items-center justify-between mx-2 bg-figmaLightDark p-2 rounded-lg'>
                    <p>Name</p> <div className='flex items-center space-x-4'><p>{tripName}</p>
                        <Popover open={openModalName} onOpenChange={setOpenModalName}>
                            <PopoverTrigger asChild>
                                <div className='flex items-center '>
                                    <Settings className='my-2 ml-2 rounded-full bg-figmaLightDark text-white text-semibold' />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-80" ref={popoverRef}>
                                <Form {...formName}>
                                    <form onSubmit={formName.handleSubmit(onSubmitName)} className="grid w-full max-w-sm items-center gap-1.5">
                                        <FormField
                                            control={formName.control}
                                            name="tripname"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input {...formName.register('tripname')} placeholder="name..." className='bg-figmaDark text-lg border-0' {...field} />
                                                    </FormControl>
                                                    <FormMessage className='text-red-500' />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className='bg-figmaGreen text-white rounded-full mt-2'>Save</Button>
                                    </form>
                                </Form>
                            </PopoverContent>
                        </Popover>

                    </div>
                </div>
                <div className='flex items-center justify-between mx-2 bg-figmaLightDark p-2 rounded-lg'>
                    <p>Destination</p> <div className='flex items-center space-x-4'><p>{destVal}</p>
                        <Popover open={openModalDest} onOpenChange={setOpenModalDest}>
                            <PopoverTrigger asChild>
                                <div className='flex items-center '>
                                    <Settings className='my-2 ml-2 rounded-full bg-figmaLightDark text-white text-semibold' />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search destinations..." />
                                    <CommandEmpty>No destination found.</CommandEmpty>
                                    <CommandGroup>
                                        {destinations.map((dest) => (
                                            <CommandItem
                                                key={dest.name}
                                                value={dest.name}
                                                onSelect={(currentValue) => {
                                                    setDestVal(currentValue === destVal ? "" : currentValue)
                                                    setOpenModalDest(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        destVal === dest.name ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {`${dest.name} (${dest.continent})`}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className='flex items-center justify-between mx-2 bg-figmaLightDark p-2 rounded-lg'>
                    <p>Budget</p> <div className='flex items-center space-x-4'><p>{budget} €</p>
                        <Popover open={openModalBudget} onOpenChange={setOpenModalBudget}>
                            <PopoverTrigger asChild>
                                <div className='flex items-center '>
                                    <Settings className='my-2 ml-2 rounded-full bg-figmaLightDark text-white text-semibold' />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-80" ref={popoverRef}>
                                <Form {...formBudget}>
                                    <form onSubmit={formBudget.handleSubmit(onSubmitBudget)} className="grid w-full max-w-sm items-center gap-1.5">
                                        <FormField
                                            control={formBudget.control}
                                            name="budget"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input {...formBudget.register('budget')} type='number' className='bg-figmaDark text-lg border-0' {...field} />
                                                    </FormControl>
                                                    <FormMessage className='text-red-500' />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className='bg-figmaGreen text-white rounded-full mt-2'>Save</Button>
                                    </form>
                                </Form>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className='flex justify-between mx-2 bg-figmaLightDark p-2 rounded-lg'>
                    <p>Split</p> <div className='flex items-center space-x-4'><p>{splitString ? "Yes" : "No"}</p>
                        <Popover open={openModalSplit} onOpenChange={setOpenModalSplit}>
                            <PopoverTrigger asChild>
                                <div className='flex items-center '>
                                    <Settings className='my-2 ml-2 rounded-full bg-figmaLightDark text-white text-semibold' />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandGroup>
                                        <CommandItem
                                            value={"Yes"}
                                            onSelect={() => {
                                                setSplitString(true)
                                                setOpenModalSplit(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    splitString === true ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {"Yes"}
                                        </CommandItem>
                                    </CommandGroup>
                                    <CommandGroup>
                                        <CommandItem
                                            value={"No"}
                                            onSelect={() => {
                                                setSplitString(false)
                                                setOpenModalSplit(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    splitString === false ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {"No"}
                                        </CommandItem>
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>

                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center m-2 text-center'>
                <p className='text-sm'>Trip days</p>
                <div className="flex flex-col justify-center h-1/2 mt-4">
                    <Calendar
                        mode="multiple"
                        selected={tripDays}
                        onSelect={setTripDays}
                        className="rounded-md border flex justify-center"
                    />
                </div>
            </div>
            {trip.name !== tripName || trip.destination !== destVal || trip.budget !== budget || trip.budget_split !== splitString || days.map(day => day.day) !== tripDays ?
                <div className='flex justify-center'><Button className=' bg-figmaGreen text-white text-lg rounded-full p-3 m-4' onClick={handlechanges}>Save changes</Button> </div>

                : <div></div>}
        </div>
    )
}

export default ManageTrip
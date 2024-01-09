"use client"
import { MapPin, Search, Banknote, Settings2 } from "lucide-react";

import * as z from "zod"


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
    tripInfo: z
        .any()
})


const StartTrip = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (data.tripInfo !== undefined) {
            router.push(`/create/${data.tripInfo}`)
        }
        else {
            router.push('/create/location')
        }
    }

    const router = useRouter()


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-center absolute bottom-0 w-full mb-8">
                <div className="py-4 bg-figmaGreen rounded-full flex flex-col justify-between items-center relative">
                    <p className="absolute top-1 left-50 text-sm text-gray-300">Search in...</p>
                    <div className="flex">
                        <div className="m-2 flex flex-col items-center">
                            <FormField control={form.control} name="tripInfo" render={({ field }) => (
                                <FormItem>
                                    <Select defaultValue="location" onValueChange={field.onChange} >
                                        <FormControl>
                                            <SelectTrigger className="w-[180px] bg-figmaGreen border-figmaGreen">
                                                <SelectValue placeholder="Explore here!" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup className="bg-figmaGreen border-figmaGreen" >
                                                <SelectItem value="location">
                                                    <div className="flex items-center justify-between">
                                                        <div className="bg-figmaLightGreen rounded-full p-1 mr-4 flex items-center">
                                                            <MapPin color="white" />
                                                        </div>
                                                        Location
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="budget">
                                                    <div className="flex items-center justify-between">
                                                        <div className="bg-figmaLightGreen rounded-full p-1 mr-4 flex items-center">
                                                            <Banknote color="white" />
                                                        </div>
                                                        Budget
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="preferences">
                                                    <div className="flex items-center justify-between">
                                                        <div className="bg-figmaLightGreen rounded-full p-1 mr-4 flex items-center">
                                                            <Settings2 color="white" />
                                                        </div>
                                                        Preferences
                                                    </div>
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <Button type="submit" className="bg-figmaLightGreen rounded-full p-2 m-2 flex items-center">
                            <Search color="white" />
                        </Button>
                    </div>
                </div>
            </form>
        </Form >
    )
}

export default StartTrip
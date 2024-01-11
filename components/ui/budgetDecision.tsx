"use client"
import { cn } from "@/lib/utils"
import { Euro } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Check, ChevronsUpDown, CalendarDays, MoveRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"

import {
    Command,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import Link from "next/link";




const splits = [
    {
        value: "per person",
        label: "per person",
    },
    {
        value: "together",
        label: "together",
    },
]

const BudgetDecision = () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [days, setDays] = useState<Date[] | undefined>();

    const handleCreateLink = () => {
        console.log("Create stuff here");
    }

    return (
        <div>
            <div className="mt-10">
                <Separator />
            </div>
            <div className="flex justify-between mt-2">
                <Euro />
                <p className="text-sm">What&apos;s your budget?</p>
            </div>
            <div className="flex justify-center mt-10">
                <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    className={cn("w-[90%]")}
                />
            </div>
            <div className="flex items-center justify-center mt-10">
                <p className="bg-figmaDark py-1 px-4 rounded-full border border-gray-300">1000</p>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between border-none"
                        >
                            {value
                                ? splits.find((split) => split.value === value)?.label
                                : "Select split..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandGroup>
                                {splits.map((split) => (
                                    <CommandItem
                                        key={split.value}
                                        value={split.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === split.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {split.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="mt-10">
                <Separator />
            </div>
            <div className="mt-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="flex justify-center space-x-6 items-center">
                            <div className="bg-figmaDark p-2 rounded-full">
                                <CalendarDays />
                            </div>
                            <p className="text-lg">
                                Add preffered days
                            </p>
                            <div className="bg-figmaDark p-2 rounded-full">
                                <MoveRight />
                            </div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="flex justify-center h-1/2">
                            <Calendar
                                mode="multiple"
                                selected={days}
                                onSelect={setDays}
                                className="rounded-md border"
                            />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            {days === undefined || days.length === 0 ? <div></div> :
                <div className='fixed inset-x-0 bottom-12 flex justify-center'>
                    <Button onClick={handleCreateLink} className='bg-figmaGreen text-white text-lg rounded-full px-14 py-4'>Create</Button>
                </div>
            }
        </div>
    )
}

export default BudgetDecision
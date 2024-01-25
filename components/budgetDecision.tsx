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
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { Label } from "./ui/label";
import axios from "axios";


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
interface BudgetDecisionProps {
    destination: string,
    userId: string
}
const BudgetDecision: React.FC<BudgetDecisionProps> = ({ destination, userId }) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [days, setDays] = useState<Date[] | undefined>();
    const [budget, setBudget] = useState(1000)
    const [name, setName] = useState("")
    const [budgetSplit, setBudgetSplit] = useState(true)

    const changeBudgetSlide = (event: any) => {
        setBudget(event)
    }

    const changeBudgetInput = (event: any) => {
        setBudget(event.target.value)
    }
    const changeName = (event: any) => {
        setName(event.target.value)
    }

    const handleCreateLink = async () => {
        if (value === "together") {
            setBudgetSplit(true)
        }
        else {
            setBudgetSplit(false)
        }
        try {
            const ownerId = userId
            await axios.post("/api/createTrip", { name, ownerId, destination, days, budget, budgetSplit })
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    return (
        <div>
            <div className="mt-10">
                <Separator />
            </div>
            <div className="flex justify-center w-full mt-4">
                <div className="w-full max-w-sm items-center gap-1.5">
                    <Label>Trip name</Label>
                    <Input type="text" placeholder="Name of the trip" onChange={changeName} value={name} />
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <Euro />
                <p className="text-sm">What&apos;s your budget?</p>
            </div>
            <div className="flex justify-center mt-10">
                <Slider
                    defaultValue={[budget]}
                    max={5000}
                    step={1}
                    className={cn("w-[90%]")}
                    onValueChange={changeBudgetSlide}
                    value={[budget]}
                />
            </div>
            <div className="flex items-center justify-around mt-10">
                <div className="flex items-center justify-center">
                    <div className="relative w-1/2">
                        <Input type="number" className="bg-figmaDark py-1 w-full mr-1 rounded-full border border-gray-300 pl-2 pr-8" onChange={changeBudgetInput} value={budget} />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <Euro />
                        </div>
                    </div>
                </div>
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
                                Add preferred days
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
            {(days !== undefined && budget !== 0 && name !== "") ? (
                <div className='fixed inset-x-0 bottom-12 flex justify-center'>
                    <Link onClick={handleCreateLink} href={`/`} className='bg-figmaGreen text-white text-lg rounded-full px-14 py-4'>Complete</Link>
                </div>
            ) :
                <div></div>}
        </div>
    )
}

export default BudgetDecision
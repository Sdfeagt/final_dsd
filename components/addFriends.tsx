"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Check, Link } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { cn } from '@/lib/utils';
import axios from 'axios';

const FormSchema = z.object({
    email: z.string().email({
        message: "Please provide a valid email."
    })
});


const AddFriends = () => {
    const [openModal, setOpenModal] = useState(false);
    const [sent, setSent] = useState(false);
    const [fadeEffect, setFadeEffect] = useState(false);
    const [emails, setEmails] = useState()
    const popoverRef = useRef<HTMLDivElement>(null);

    function handleOutsideClick(event: any) {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
            setOpenModal(false);
        }
    }

    useEffect(() => {
        if (openModal) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            // Clean up the event listener
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [openModal])



    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setOpenModal(false);
        setSent(true);
        setFadeEffect(true);
        form.reset();

        setTimeout(() => {
            setFadeEffect(false);
            setTimeout(() => {
                setSent(false);
            }, 500);
        }, 2000);
    }

    return (
        <Popover open={openModal}>
            <PopoverTrigger asChild>
                <div className='flex items-center '>
                    <Button onClick={() => setOpenModal(!openModal)} className='my-2 ml-2 rounded-full bg-figmaLightDark text-white text-semibold'>+ Add Friends</Button>
                    {sent && !openModal && (
                        <div className={cn("flex transition-opacity duration-500", fadeEffect ? "opacity-100'" : "opacity-0")}>
                            <Check /> <p className='text-figmaGreen'>Message sent</p>
                        </div>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80" ref={popoverRef}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full max-w-sm items-center gap-1.5">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...form.register('email')} placeholder="Email..." className='bg-figmaDark text-lg border-0' {...field} />
                                    </FormControl>
                                    <FormMessage className='text-red-500' />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='bg-figmaGreen text-white rounded-full mt-2'>Submit</Button>
                    </form>
                </Form>
                <Separator className='my-4' />
                <p className='flex justify-center'>or share via private link</p>
                <div className='flex justify-center'>
                    <Link className='flex justify-center m-1' />
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default AddFriends;

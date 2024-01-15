import React from 'react'
import { UserButton, auth, clerkClient } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

import { Bell, MenuIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Image from 'next/image';
import Link from 'next/link';




const MainNav = async () => {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const user = await clerkClient.users.getUser(userId);


  return (
    <div className="flex items-center justify-between p-2 bg-figmaDark text-white rounded-2xl">
      <div className='flex items-center space-x-5'>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href={"/profile"}>Profile</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href={"/preferences"}>Preferences</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href={"/subscription"}>Subscription</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <UserButton afterSignOutUrl='/sign-in"' /> */}
          <Image className='rounded-full' src={user.imageUrl} alt='userimage' width={36} height={36} />
          <div>
            <h1 className="text-lg font-semibold">Hello,</h1>
            <p className="text-sm">{user?.firstName}</p>
          </div>
        </div>
      </div>

      <Bell className="w-6 h-6 flex-shrink-0" />


    </div>


  )
}

export default MainNav
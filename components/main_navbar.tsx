"use client";
import React from 'react'
import { UserButton, useUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import Image from 'next/image';

import Menu from "@/public/menu.svg"
import Bell from "@/public/bell.svg"



const MainNav = () => {
  const { user } = useUser();
  console.log(user);

  if (user) {
    return (
      <div className="flex items-center justify-between p-2 bg-primary text-white rounded-2xl">
        <div className='flex items-center space-x-5'>
          <Image src={Menu} alt="menu" className="w-8 h-8 flex-shrink-0" />

          <div className="flex items-center space-x-2">
            <UserButton afterSignOutUrl='/' />
            <div>
              <h1 className="text-lg font-semibold">Hello,</h1>
              <p className="text-sm">{user.firstName}</p>
            </div>
          </div>
        </div>

        <Image src={Bell} alt="bell" className="w-8 h-8 flex-shrink-0" />
      </div>


    )
  }
  else {
    redirect("/sign-in")
  }
}

export default MainNav
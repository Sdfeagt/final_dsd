import React from 'react'
import { UserButton, auth, clerkClient } from "@clerk/nextjs";
import { redirect } from 'next/navigation';

import { Bell } from 'lucide-react';



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
          <UserButton afterSignOutUrl='/sign-in"' />
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
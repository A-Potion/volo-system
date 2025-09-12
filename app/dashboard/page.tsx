"use client"

import { Logout } from "@/components/logout"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { NewEventDialog } from "@/components/new-event-dialog"
import { useParams, usePathname, redirect } from "next/navigation"
import { useEffect, useState } from "react"
import MyEvents from "@/components/my-events"

export default function Dashboard() {

    return(
      <div>
        <div className="absolute top-4 right-4">
        <Logout />
        </div>
<div className = 'flex flex-col items-center justify-center h-screen'>
    <div className = 'flex flex-row items-center justify-center mb-4'>
        {/* <Link href='/new-event'>
        <Button>New event</Button>
        </Link> */}
        <NewEventDialog />
        {/* <Link href='/my-events'>
        <Button>My events</Button>
        </Link> */}
    </div>
    
    <MyEvents />
    </div>
    </div>
    
    )
}
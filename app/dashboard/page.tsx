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
        <div className="flex flex-col justify-between items-center min-h-screen">
<div className="flex flex-col items-center justify-center min-h-screen">
  <NewEventDialog />
  <div className="mt-8 flex flex-col items-center w-full">
    <MyEvents />
  </div>
</div>
</div>

</div>
    
    )
}
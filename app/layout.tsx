"use client"
import './globals.css'
import { authClient } from '@/lib/auth/auth-client'

import { Toaster } from "@/components/ui/sonner"

import { Logout } from '@/components/logout'
import { useState, useEffect } from 'react'





export default function IndexLayout({
    children,
}: {
    children: React.ReactNode
}) {
      const [session, setSession] = useState<any>(null)
        useEffect(() => {
    const fetchSession = async () => {
        try {
            const { data: sessionData } = await authClient.getSession()
            setSession(sessionData)
        } catch (error) {
            console.log("Not logged in.")
        }
      }
      fetchSession()
    }, [])
    return (
        <html lang="en">
            <body>
                { session ? (
                    <div className="absolute top-4 right-4">
                            <Logout />
                            </div>
                ) : (<></>)
                }

                <main className='min-h-screen w-screen bg-slate-300'>{children}</main>
                <Toaster />
            </body>
        </html>
    )
}
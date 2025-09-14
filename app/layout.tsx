import './globals.css'

import { Toaster } from "@/components/ui/sonner"

export default function IndexLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>

                <main className='min-h-screen w-screen bg-slate-300'>{children}</main>
                <Toaster />
            </body>
        </html>
    )
}
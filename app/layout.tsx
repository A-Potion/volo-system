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
                <main>{children}</main>
                <Toaster />
            </body>
        </html>
    )
}
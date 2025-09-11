"use client"
import Router, { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()
    router.push('/login')
    return(
        <h1 className="text-blue underline">Landing page</h1>
    )
}
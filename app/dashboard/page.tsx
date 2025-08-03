import { Logout } from "@/components/logout"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
export default function Dashboard() {
    return(
        <div>
<div className = 'flex flex-col items-center justify-center h-screen'>
    <h1>Welcome to Volo System</h1>
    <div className = 'flex flex-row items-center justify-center gap-4'>
        <Link href='/new-event'>
        <Button>New event</Button>
        </Link>
        <Link href='/my-events'>
        <Button>My events</Button>
        </Link>
    </div>
    <Logout />
</div>
</div>
    )
}
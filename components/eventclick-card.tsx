import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default function EventCard({name, start, end, id}: string) {
    return(
      <div className=" min-w-60">
        <Card>
  <CardHeader>
    <CardTitle>{name}</CardTitle>
    <CardDescription>{start} — {end}</CardDescription>
    <CardAction><Link href={`event/${id}`}>View</Link></CardAction>
  </CardHeader>
</Card>
</div>
    )
}
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useState, useEffect } from "react"
import { authClient } from "@/lib/auth/auth-client";


type TableProps = React.ComponentProps<"div"> & {
  info?: object;
};
const { data: session } = await authClient.getSession()

function getCoolDate(oldTimestamp) {
  let timestamp = new Date(oldTimestamp)
  let day = timestamp.getDate()
  let month = timestamp.getMonth()
  let year = timestamp.getFullYear()
  return (`${day}/${month}/${year}`)
}


export function EventInfoTable({ info,
  ...props
}: TableProps ) {

    console.log(typeof(info))

  const eventinfo = info

    return(
        <div>
        <Table>
  <TableCaption></TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="text-left w-100px">Start date</TableHead>
      <TableHead className='w-100px' >End date</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
        <TableCell>{getCoolDate(eventinfo.start)}</TableCell>
        <TableCell>{getCoolDate(eventinfo.end)}</TableCell>
    </TableRow>
  </TableBody>
</Table>
</div>

    )
}
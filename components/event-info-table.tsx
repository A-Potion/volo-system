import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { getCoolDate } from "@/lib/toolets/ddmmyyyy";
import { useState, useEffect } from "react"
import { authClient } from "@/lib/auth/auth-client";


interface EventInfo {
    start: string,
    end: string,
  }

type TableProps = React.ComponentProps<"div"> & {
  info?: EventInfo | null;
};
const { data: session } = await authClient.getSession()



export function EventInfoTable({ info,
  ...props
}: TableProps ) {



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
      {eventinfo?.start && eventinfo?.end ? (
        <>
          <TableCell>{getCoolDate(eventinfo.start)}</TableCell>
          <TableCell>{getCoolDate(eventinfo.end)}</TableCell>
        </>
      ) : (
        <TableCell colSpan={2}>No event information available</TableCell>
      )}
    </TableRow>
  </TableBody>
</Table>
</div>

    )
}
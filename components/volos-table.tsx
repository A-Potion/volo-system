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
import { getCoolDate } from "@/lib/toolets/ddmmyyyy";


type VolunteerTableProps = React.ComponentProps<"div"> & {
  info?: object;
};
const { data: session } = await authClient.getSession()


export function VoloTable({ info,
  ...props
}: VolunteerTableProps ) {

  const volos = info.volunteers

    return(
        <div>
        <Table>
  <TableCaption></TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="text-left w-20%">Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead className='text-right' >DOB</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
      {
                volos.map((volo) => (
                  <TableRow key={volo.userid}>
                        <TableCell>{volo.name}</TableCell>
                        <TableCell>{volo.email}</TableCell>
                        <TableCell className='text-right'>{getCoolDate(volo.dob)}</TableCell>
                    </TableRow>
                ))
            }
  </TableBody>
</Table>
</div>

    )
}
"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation'
import { DeleteDialog } from '@/components/delete-confirm';
import { VoloTable } from '@/components/volos-table';

export default function EventPage() {

  const [eventInfo, setEventInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEventInfo();
  }, []);

  const params = useParams();
  const pathNow = usePathname()

  const fetchEventInfo = async () => {
    const res = await fetch(`/api/events/${params.id}/view`);
    if (res.status === 404) {
      redirect('/404')
    } 
    const data = await res.json();

    setEventInfo(data.data);
    
    setIsLoading(false)
  };

    console.log(eventInfo)
    
    function getNormalDate(timestamp) {
      const datey = new Date(timestamp)
      return datey.toDateString()
  }


  return (
    <>
    <div>
      { isLoading ? (
        <div>
        <h1>Loading!</h1>
        </div>
      ) : (
        <>
      <div>
      <h1>{eventInfo.name}</h1>
      <h2>{getNormalDate(eventInfo.start)} '-&gt;' {getNormalDate(eventInfo.end)}</h2>
      <p>lipsum</p>
      <VoloTable info={eventInfo} />
      <DeleteDialog name={eventInfo.name} id={params.id} />
      <Link href={`${pathNow}/volunteer`}>
      <Button>
        Volunteer at this event</Button>
        </Link>
      </div>
      </>
      )
    }
    </div>
    </>
  )
}
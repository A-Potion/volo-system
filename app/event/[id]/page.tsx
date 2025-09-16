"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Logout } from '@/components/logout';
import { usePathname } from 'next/navigation'
import { DeleteDialog } from '@/components/delete-confirm';
import { VoloTable } from '@/components/volos-table';
import { EventInfoTable } from '@/components/event-info-table';
import { CopyLinkDialog } from '@/components/copy-link';



export default function EventPage() {

interface EventInfo {
  name: string;
  id: string,
  start: string,
  end: string,
  volunteers: Volunteer[]
}

type Volunteer = {
  userid: string;
  name: string;
  email: string;
  dob: string;
};


  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true)
  const [isOwner, setIsOwner] = useState(false)

const params = useParams<{ id: string }>();
const pathNow = usePathname();

useEffect(() => {
  const fetchEventInfo = async () => {
    if (!params?.id) {
      redirect('/404');
      return;
    }

    const res = await fetch(`/api/events/${params.id}/view`);

    if (res.status === 404) {
      redirect('/404');
      return;
    }

    const data = await res.json();

    setEventInfo(data.data);
    setIsOwner(data.isOwner);
    setIsLoading(false);
    console.log(data);
  };

  fetchEventInfo();
}, [params?.id]); // ✅ Depend on id only


    
    function getNormalDate(timestamp: string) {
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
      {eventInfo && (
  <>
  
    <h1 className='text-center text-6xl mb-8'>{eventInfo.name}</h1>
    <EventInfoTable info={eventInfo} />
    <VoloTable info={eventInfo} />
  </>
)}
      <div className="flex flex-center justify-center gap-4 left-4">
      {
        isOwner ? (
          <>
          <div className="absolute top-4 right-4">
                  <Logout />
                  </div>
          <div className="flex flex-center justify-center gap-4 left-4">
        {eventInfo && params?.id && (
  <DeleteDialog name={eventInfo.name} id={params?.id || '404'} />
)}
        <CopyLinkDialog whatto={`${eventInfo?.name || 'unnamed'} volunteer form`} lnk={`${location.host}${pathNow}/volunteer`} />
        </div>
        </>
        ) : (
        <Link href={`${pathNow}/volunteer`}>
      <Button>
        Volunteer at this event</Button>
        </Link>)
        }
        </div>
      </div>
      </>
      )
    }
    </div>
    </>
  )
}
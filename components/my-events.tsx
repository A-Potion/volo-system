import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import Link from "next/link";
import EventCard from "./eventclick-card";

export default function MyEvents() {

  type Event = {
  _id: string;
  name: string;
  start: string;
  end: string;
};

const [events, setEvents] = useState<Event[]>([]);
const [voloEvents, setVoloEvents] = useState<Event[]>([]);


  useEffect(() => {
    fetchEvents();
    fetchVoloEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch('/api/events');
    const data = await res.json();
    console.log(data)
    setEvents(data.data);

  };

  const fetchVoloEvents = async () => {
    const res = await fetch('/api/events/findme');
    const data = await res.json();
    console.log(data)
    setVoloEvents(data.data);

  };

    function getNormalDate(timestamp: string) {
    const datey = new Date(timestamp)
    return datey.toDateString()
  }
  return(
    <Tabs className="flex items-center flex-wrap w-[400px]" defaultValue="owned">
  <TabsList className="flex shrink-0 gap-2 bg-inherit">
    <TabsTrigger className="flex h-[40px] flex-1 cursor-default items-center justify-center bg-white px-5 text-[15px] leading-none text-violet-700 outline-solid outline-violet-700 first:rounded-tl-md last:rounded-tr-md hover:bg-violet-200 data-[state=active]:text-white data-[state=active]:focus:relative data-[state=active]:bg-violet-700" value="owned">Owned events</TabsTrigger>
    <TabsTrigger className="flex h-[40px] flex-1 cursor-default items-center justify-center bg-white px-5 text-[15px] leading-none text-violet-700 outline-solid outline-violet-700 first:rounded-tl-md last:rounded-tr-md hover:bg-violet-200 data-[state=active]:text-white data-[state=active]:focus:relative data-[state=active]:bg-violet-700" value="volunteer">Events where you volunteer</TabsTrigger>
  </TabsList>
  <TabsContent value="owned">
    { events.length>0 ? ( 
        <div className="flex gap-2 flex-col items-center">
      {/* <ul> */}
        {events.map((event) => (
          // <li key={event._id}>
          //   <Link target='_blank' href={`event/${event._id}`}> {event.name} - {getNormalDate(event.start)} - {getNormalDate(event.end)} </Link>
          // </li>
          
          <EventCard key={event._id} name={event.name} start={getNormalDate(event.start)} end={getNormalDate(event.end)} id={event._id} />
        ))}
      {/* </ul> */}
      </div> 
      ) : <p>You do not own any events.</p>
}
  </TabsContent>
  <TabsContent value="volunteer">
    { voloEvents.length>0 ? (
      <div className="flex gap-2 flex-col items-center">
      {/* <ul> */}
        {voloEvents.map((event) => (
          // <li key={event._id}>
          //   <Link target='_blank' href={`event/${event._id}`}> {event.name} - {getNormalDate(event.start)} - {getNormalDate(event.end)} </Link>
          // </li>

          <EventCard key={event._id} name={event.name} start={getNormalDate(event.start)} end={getNormalDate(event.end)} id={event._id} />
        ))}
      {/* </ul> */}
      </div> 
      ) : (
        <h1>You are not volunteering at any events.</h1>
      )}

  </TabsContent>
</Tabs>

      )}
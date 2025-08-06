"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [voloEvents, setVoloEvents] = useState([]);

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

    function getNormalDate(timestamp) {
    const datey = new Date(timestamp)
    return datey.toDateString()
  }


  return (
    <div>
      { events.length>0 ? ( 
        <div>
          <h1>Events you own</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <Link href={`event/${event._id}`}> {event.name} - {getNormalDate(event.start)} - {getNormalDate(event.end)} </Link>
          </li>
        ))}
      </ul>
      </div> 
      ) : <p>You don't own any events.</p>
}
{
      voloEvents.length>0 ? (
      <div>
      <h1>Events you volunteer at</h1>
      <ul>
        {voloEvents.map((event) => (
          <li key={event._id}>
            <Link href={`event/${event._id}`}> {event.name} - {getNormalDate(event.start)} - {getNormalDate(event.end)} </Link>
          </li>
        ))}
      </ul>
      </div>
      ) : (
        <h1>You're not volunteering at any events.</h1>
      )
      }
    </div>
  );
}
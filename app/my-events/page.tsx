"use client"

import { useState, useEffect } from 'react';

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch('/api/events');
    const data = await res.json();
    console.log(data)
    setEvents(data.data);

  };

    function getNormalDate(timestamp) {
    const datey = new Date(timestamp)
    return datey.toDateString()
  }


  return (
    <div>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            {event.name} - {getNormalDate(event.start)} - {getNormalDate(event.end)}
          </li>
        ))}
      </ul>
    </div>
  );
}
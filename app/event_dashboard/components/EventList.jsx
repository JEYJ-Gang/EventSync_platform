"use client";

import { useEffect, useState } from "react";
import EventCard from "./EventCard";

export default function EventList() {

  const [events, setEvents] = useState([]);

  useEffect(() => {

    async function fetchEvents() {

      try {

        const response = await fetch("http://localhost:3000/api/events");

        const data = await response.json();

        setEvents(data);

      } catch (error) {
        console.error(error);
      }
    }

    fetchEvents();

  }, []);

  return (

    <div className="flex flex-wrap gap-6 p-6">

      {events?.data?.map((event) => (

        <EventCard
          key={event.id}
          event={event}
        />

      ))}

    </div>
  );
}
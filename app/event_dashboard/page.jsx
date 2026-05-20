"use client";

import { useEffect, useState } from "react";

import EventList from "./components/EventList";

export default function EventDashboard() {

  const [events, setEvents] = useState({data: [],});

  useEffect(() => {

    async function fetchEvents() {

      const res = await fetch("/api/events");

      const data = await res.json();

      setEvents(data);
    }

    fetchEvents();

  }, []);

  if (!events) {
    return <p>Loading...</p>;
  }

  return (
    <div>

      <EventList events={events} />

    </div>
  );
}
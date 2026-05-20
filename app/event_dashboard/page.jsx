"use client";

import { useEffect, useState } from "react";

import EventList from "./components/EventList";
import EventModal from "./components/EventModal";

export default function EventDashboard() {

  const [events, setEvents] = useState({ data: [], });
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {

    async function fetchEvents() {

      const res = await fetch("/api/events");

      const data = await res.json();

      setEvents(data);
    }

    fetchEvents();

  }, []);

  async function openEventModal(eventId) {

    const res = await fetch(`/api/events/${eventId}`);

    const data = await res.json();

    setSelectedEvent(data);
  }

  function closeModal() {
   setSelectedEvent(null);
  }

  return (
    <div>

      <EventList events={events}
                  openEventModal={openEventModal} />
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          closeModal={closeModal}
        />
      )}

    </div>
  );
}
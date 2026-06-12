"use client";

import { useEffect, useState } from "react";

import EventList from "./components/EventList";
import EventModal from "./components/EventModal";
import SearchBar from "./components/SearchBar";
import SidebarFilter from "./components/SidebarFilter";

export default function EventDashboard() {

  const [events, setEvents] = useState({ data: [], });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredEvents = {
  ...events,
  data: events.data.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  ),
};

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
    <div className="flex min-h-screen">
      <aside className="w-64  border-r border-gray-300">
        <SidebarFilter
          filter={filter}
          setFilter={setFilter} />
      </aside>
      <div className="flex-1 p-6 ">

        <nav className="flex row items-center justify-between gap-30">
          <div className="text-2xl font-bold">
            EventSync
          </div>
          <SearchBar 
            search={search}
            setSearch={setSearch}/>
          <div>

          </div>
        </nav>
        <div>
          <EventList
            events={filteredEvents}
            filter={filter}
            openEventModal={openEventModal} />
          {selectedEvent && (
            <EventModal
              event={selectedEvent}
              closeModal={closeModal}
            />
          )}
        </div>
      </div>


    </div>
  );
}
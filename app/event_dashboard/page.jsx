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
      <div className="app-layout">
        {/* Sidebar gauche fixe */}
        <SidebarFilter filter={filter} setFilter={setFilter} />

        {/* Contenu principal utilisant STRICTEMENT la classe home-main du CSS */}
        <main className="home-main">

          {/* Barre de recherche */}
          <SearchBar search={search} setSearch={setSearch} />

          {/* Section Événements calquée sur l'accueil */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Prochains événements</h2>
              <span className="section-link cursor-pointer">Tout voir →</span>
            </div>

            <EventList
                events={filteredEvents}
                filter={filter}
                openEventModal={openEventModal}
            />
          </section>

          {/* Fenêtre Modale */}
          {selectedEvent && (
              <EventModal event={selectedEvent} closeModal={closeModal} />
          )}
        </main>
      </div>
  );
}
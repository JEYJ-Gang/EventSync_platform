"use client";

import EventCard from "./EventCard";

export default function EventList({ events, filter, openEventModal }) {
  const today = new Date();

  const filteredEvents = events?.data?.filter((event) => {
    const eventDate = new Date(event.start_date);

    switch (filter) {
      case "today":
        return eventDate.toDateString() === today.toDateString();
      case "week":
        const endOfWeek = new Date();
        endOfWeek.setDate(today.getDate() + 7);
        return eventDate >= today && eventDate <= endOfWeek;
      default:
        return true;
    }
  }) || [];

  if (filteredEvents.length === 0) {
    return <p className="empty-state">Aucun événement à venir pour le moment.</p>;
  }

  return (
      <div className="events-grid">
        {filteredEvents.map((event) => (
            <EventCard
                key={event.id}
                event={event}
                openEventModal={openEventModal}
            />
        ))}
      </div>
  );
}
"use client";

import EventCard from "./EventCard";

export default function EventList({
  events,
  filter,
  openEventModal,
}) {

  const today = new Date();

  const filteredEvents = events?.data?.filter((event) => {

    // Remplace "date" par le vrai nom du champ date
    const eventDate = new Date(event.start_date);

    switch (filter) {

      case "today":
        return (
          eventDate.toDateString() ===
          today.toDateString()
        );

      case "week":
        const endOfWeek = new Date();
        endOfWeek.setDate(today.getDate() + 7);

        return (
          eventDate >= today &&
          eventDate <= endOfWeek
        );

      default:
        return true;
    }

  }) || [];

  if (filteredEvents.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-4xl font-bold text-gray-400">
          Aucun évènement prévu.
        </p>
      </div>

    );
  }

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
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
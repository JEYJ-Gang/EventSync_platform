"use client";

import { useEffect, useState } from "react";
import EventCard from "./EventCard";

export default function EventList({
  events,
  openEventModal,
}) {

  return (

    <div className="flex flex-wrap gap-6 p-6">

      {events?.data?.map((event) => (

        <EventCard
          key={event.id}
          event={event}
          openEventModal={openEventModal}
        />

      ))}

    </div>
  );
}
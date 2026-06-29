export default function EventCard({ event, openEventModal }) {
    return (
        <div className="event-card" onClick={() => openEventModal(event.id)}>
            <div className="event-card-header">
                <div className="event-emoji">📅</div>
                <span className="event-status status-upcoming">À venir</span>
            </div>

            <h3 className="event-title">{event.title}</h3>
            <p className="event-desc">{event.description || "Aucune description fournie."}</p>

            <div className="event-footer">
                <div className="event-meta">
          <span className="event-date">
            {new Date(event.start_date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })}
          </span>
                    <span className="event-location max-w-[120px] truncate">
            📍 {event.location || "Distanciel"}
          </span>
                </div>
            </div>
        </div>
    );
}
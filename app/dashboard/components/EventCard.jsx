'use client';
import Link from 'next/link';

function getStatus(event) {
    const now = new Date();
    const start = new Date(event.start_date);
    const end = new Date(event.end_date);
    if (now >= start && now <= end) return { label: 'En cours', cls: 'status-live' };
    if (now < start) return { label: 'À venir', cls: 'status-upcoming' };
    return { label: 'Terminé', cls: 'status-past' };
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export default function EventCard({ event }) {
    const status = getStatus(event);
    const enrolled = event.sessions?.reduce((acc, s) => acc + (s.max_participant ?? 0), 0) ?? 0;
    const capacity = enrolled || 0;

    return (
        <Link href={`/events/${event.id_event}`} className="event-card">
            <div className="event-card-header">
                <div className="event-emoji">
                    {event.title?.[0] ?? '🎯'}
                </div>
                <span className={`event-status ${status.cls}`}>{status.label}</span>
            </div>
            <h3 className="event-title">{event.title}</h3>
            <p className="event-desc">{event.description ?? 'Aucune description'}</p>
            <div className="event-footer">
                <div className="event-meta">
                    <span className="event-date">📅 {formatDate(event.start_date)}</span>
                    {event.location && <span className="event-location">{event.location}</span>}
                </div>
                <div className="event-progress-row">
                    <div className="event-progress-bar">
                        <div
                            className="event-progress-fill"
                            style={{ width: capacity > 0 ? `${Math.min((enrolled / capacity) * 100, 100)}%` : '0%' }}
                        />
                    </div>
                    <span className="event-capacity">{capacity} places</span>
                </div>
            </div>
        </Link>
    );
}
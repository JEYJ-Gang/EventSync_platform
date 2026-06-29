'use client';
import Link from 'next/link';

function formatTime(timeStr) {
    if (!timeStr) return '';
    const d = new Date(timeStr);
    return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`;
}

export default function SessionCard({ session, eventId }) {
    return (
        <Link href={`/session/${session.id}`} className="session-card">
            <div className="session-card-header">
                <div className="session-icon">🎤</div>
                <span className={`event-status ${session.is_live ? 'status-live' : 'status-upcoming'}`}>
                    {session.is_live ? '🔴 En direct' : 'À venir'}
                </span>
            </div>
            <h3 className="event-title">{session.title}</h3>
            <p className="event-desc">{session.description ?? 'Aucune description'}</p>
            <div className="session-footer">
                <span className="event-date">
                    🕐 {formatTime(session.start_time)} – {formatTime(session.end_time)}
                </span>
                {session.room && (
                    <span className="event-location">📍 {session.room.name}</span>
                )}
            </div>
            {session.speakers?.length > 0 && (
                <div className="session-speakers">
                    {session.speakers.map(s => (
                        <span key={s.id} className="speaker-tag">{s.full_name}</span>
                    ))}
                </div>
            )}
        </Link>
    );
}
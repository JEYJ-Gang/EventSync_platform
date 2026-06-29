import Link from 'next/link';
import SessionCard from './components/SessionCard';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

async function fetchAllSessions() {
    try {
        const res = await fetch(`${BASE_URL}/api/events/1/sessions`, { cache: 'no-store' });
        const json = await res.json();
        return (json.data ?? []).map(s => ({ ...s, eventId: 1 }));
    } catch {
        return [];
    }
}

export default async function SessionsPage() {
    const sessions = await fetchAllSessions();
    const liveSessions = sessions.filter(s => s.is_live);
    const upcomingSessions = sessions.filter(s => !s.is_live);

    return (
        <main className="home-main">
            <div className="hero-section" style={{ padding: '36px 40px', marginBottom: '28px' }}>
                <div className="hero-badge">Programme</div>
                <h1 className="hero-title" style={{ fontSize: '36px' }}>
                    Sessions <em>du moment</em>
                </h1>
                <p className="hero-desc" style={{ fontSize: '16px', marginBottom: 0 }}>
                    {sessions.length} session{sessions.length > 1 ? 's' : ''} au total
                    {liveSessions.length > 0 && ` · ${liveSessions.length} en direct`}
                </p>
            </div>

            {liveSessions.length > 0 && (
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">🔴 En direct maintenant</h2>
                    </div>
                    <div className="events-grid">
                        {liveSessions.map(s => (
                            <SessionCard key={s.id} session={s} eventId={s.eventId} />
                        ))}
                    </div>
                </section>
            )}

            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">Toutes les sessions</h2>
                </div>
                {upcomingSessions.length > 0 ? (
                    <div className="events-grid">
                        {upcomingSessions.map(s => (
                            <SessionCard key={s.id} session={s} eventId={s.eventId} />
                        ))}
                    </div>
                ) : (
                    <p className="empty-state">Aucune session disponible.</p>
                )}
            </section>
        </main>
    );
}
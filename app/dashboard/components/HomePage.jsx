import Link from 'next/link';
import HeroSection from './HeroSection';
import StatsBar from './StatsBar';
import EventCard from './EventCard';
import SpeakerCard from './SpeakerCard';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

async function fetchEvents() {
    try {
        const res = await fetch(`${BASE_URL}/api/events`, { cache: 'no-store' });
        const json = await res.json();
        return json.data ?? [];
    } catch {
        return [];
    }
}

async function fetchSpeakers() {
    try {
        const res = await fetch(`${BASE_URL}/api/speakers`, { cache: 'no-store' });
        const json = await res.json();
        return json.data ?? [];
    } catch {
        return [];
    }
}

async function fetchSessions() {
    try {
        const res = await fetch(`${BASE_URL}/api/sessions`, { cache: 'no-store' });
        const json = await res.json();
        return json.data ?? [];
    } catch {
        return [];
    }
}

function computeStats(events, speakers, sessions) {
    const now = new Date();
    const upcomingEvents = events.filter(e => new Date(e.start_date) > now).length;
    return {
        totalEvents: events.length,
        upcomingEvents,
        totalSessions: sessions.length,
        totalSpeakers: speakers.length,
    };
}

export default async function HomePage() {
    const [events, speakers, sessions] = await Promise.all([
        fetchEvents(),
        fetchSpeakers(),
        fetchSessions(),
    ]);

    const stats = computeStats(events, speakers, sessions);
    const upcomingEvents = events
        .filter(e => new Date(e.end_date) >= new Date())
        .slice(0, 3);

    return (
        <main className="home-main">

            {/* Bouton Admin aligné en haut à droite */}
            <div className="admin-bar">
                <Link href="http://localhost:5173" className="btn-admin">ADMIN</Link>
            </div>

            {/* Barre de recherche */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Rechercher un événement, une session..."
                    className="search-input"
                    readOnly
                />
            </div>

            {/* Hero */}
            <HeroSection />

            {/* Stats */}
            <StatsBar stats={stats} />

            {/* Prochains événements */}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">Prochains événements</h2>
                    <a href="/events" className="section-link">Tout voir →</a>
                </div>
                <div className="events-grid">
                    {upcomingEvents.length > 0 ? (
                        upcomingEvents.map(event => (
                            <EventCard key={event.id_event} event={event} />
                        ))
                    ) : (
                        <p className="empty-state">Aucun événement à venir pour le moment.</p>
                    )}
                </div>
            </section>

            {/* Intervenants */}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">Intervenants à l'affiche</h2>
                    <a href="/speakers" className="section-link">Voir tous →</a>
                </div>
                <div className="speakers-grid">
                    {speakers.length > 0 ? (
                        speakers.slice(0, 4).map(speaker => (
                            <SpeakerCard key={speaker.id_speaker} speaker={speaker} />
                        ))
                    ) : (
                        <p className="empty-state">Aucun intervenant pour le moment.</p>
                    )}
                </div>
            </section>
        </main>
    );
}
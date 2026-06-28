'use client';

export default function StatsBar({ stats }) {
    const items = [
        { key: 'events', label: 'Événements', value: stats?.totalEvents ?? 0 },
        { key: 'upcoming', label: 'À venir', value: stats?.upcomingEvents ?? 0 },
        { key: 'sessions', label: 'Sessions', value: stats?.totalSessions ?? 0 },
        { key: 'speakers', label: 'Intervenants', value: stats?.totalSpeakers ?? 0 },
    ];

    return (
        <div className="stats-bar">
            {items.map((item) => (
                <div key={item.key} className="stat-card">
                    <span className="stat-value">{item.value}</span>
                    <span className="stat-label">{item.label}</span>
                </div>
            ))}
        </div>
    );
}
'use client';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="hero-badge">
                <span>Saison 2026 ouverte</span>
            </div>
            <h1 className="hero-title">
                Tout ce qui se passe,
                <br />
                <em>en un seul endroit.</em>
            </h1>
            <p className="hero-desc">
                Explorez nos événements à venir, les sessions du moment et les
                voix qui les font vivre. Aucun compte requis.
            </p>
            <div className="hero-actions">
                <Link href="/events" className="btn-primary">
                    Voir les événements →
                </Link>
                <Link href="/sessions" className="btn-secondary">
                    Programme du jour
                </Link>
            </div>
        </section>
    );
}
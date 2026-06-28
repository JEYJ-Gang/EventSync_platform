'use client';
import Link from 'next/link';

const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Événements', href: '/events' },
    { label: 'Sessions', href: '/sessions' },
    { label: 'Intervenants', href: '/speakers' },
];

export default function Navbar() {
    return (
        <aside className="navbar">
            <div className="navbar-brand">
                <div className="brand-avatar">E</div>
                <div className="brand-info">
                    <span className="brand-name">EventSync</span>
                    <span className="brand-sub">DASHBOARD</span>
                </div>
            </div>
            <nav className="navbar-nav">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="nav-item">
                        <span className="nav-label">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
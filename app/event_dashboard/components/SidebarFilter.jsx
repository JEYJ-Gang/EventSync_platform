"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarFilter({ filter, setFilter }) {
    const pathname = usePathname();

    return (
        <nav className="navbar">
            {/* Brand de l'application */}
            <div className="navbar-brand">
                <div className="brand-avatar">E</div>
                <div className="brand-info">
                    <span className="brand-name">EventSync</span>
                    <span className="brand-sub">Dashboard</span>
                </div>
            </div>

            {/* Liens et Filtres de navigation */}
            <div className="navbar-nav">
                {/* CORRECTION : Redirige maintenant vers la racine / */}
                <Link href="/" className="nav-item font-semibold mb-4">
                    Accueil
                </Link>

                {pathname === "/event_dashboard" && (
                    <div className="flex flex-col gap-1 pt-2 border-t border-[#2a2a2e]">
                        <button
                            onClick={() => setFilter("all")}
                            className={`nav-item border-none bg-transparent w-full text-left cursor-pointer ${
                                filter === "all" ? "text-white bg-[#1a1a1c]" : ""
                            }`}
                        >
                            Tous les événements
                        </button>

                        <button
                            onClick={() => setFilter("today")}
                            className={`nav-item border-none bg-transparent w-full text-left cursor-pointer ${
                                filter === "today" ? "text-white bg-[#1a1a1c]" : ""
                            }`}
                        >
                            Aujourd'hui
                        </button>

                        <button
                            onClick={() => setFilter("week")}
                            className={`nav-item border-none bg-transparent w-full text-left cursor-pointer ${
                                filter === "week" ? "text-white bg-[#1a1a1c]" : ""
                            }`}
                        >
                            Cette semaine
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
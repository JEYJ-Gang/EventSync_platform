"use client";

import { useState, useEffect } from "react";
import RoomCard from "./RoomCard.jsx";

export default function RoomList({ eventId, onSelect }) {
    const [rooms,   setRooms]   = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);

    useEffect(() => {
        if (!eventId) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        setError(null);

        fetch(`/api/events/${eventId}/rooms`)
            .then((res) => {
                if (!res.ok) throw new Error(`Erreur ${res.status}`);
                return res.json();
            })
            .then((json) => setRooms(json.data ?? json))
            .catch((e)   => setError(e.message))
            .finally(()  => setLoading(false));
    }, [eventId]);

    if (loading) return (
        <div style={S.center}>
            <p style={S.muted}>Chargement des salles…</p>
        </div>
    );

    if (error) return (
        <div style={S.center}>
            <p style={S.errorText}>Une erreur est survenue : {error}</p>
            <button style={S.retryBtn} onClick={() => location.reload()}>
                Réessayer
            </button>
        </div>
    );

    if (rooms.length === 0) return (
        <div style={S.center}>
            <p style={S.muted}>Aucune salle disponible pour cet événement.</p>
        </div>
    );

    return (
        <div style={S.grid}>
            {rooms.map((room) => (
                <RoomCard
                    key={room.id_room}
                    room={room}
                    onClick={onSelect ? () => onSelect(room) : undefined}
                />
            ))}
        </div>
    );
}

const S = {
    grid: {
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap:                 20,
        fontFamily:          "'DM Sans', sans-serif",
    },
    center: {
        textAlign:  "center",
        padding:    "48px 24px",
        fontFamily: "'DM Sans', sans-serif",
    },
    muted: {
        fontSize: 14,
        color:    "#908F83",
    },
    errorText: {
        fontSize:     14,
        color:        "#e05c5c",
        marginBottom: 16,
    },
    retryBtn: {
        background:   "#A0A4F7",
        color:        "#fff",
        border:       "none",
        borderRadius: 10,
        padding:      "9px 20px",
        fontSize:     13,
        fontWeight:   600,
        cursor:       "pointer",
        fontFamily:   "inherit",
    },
};
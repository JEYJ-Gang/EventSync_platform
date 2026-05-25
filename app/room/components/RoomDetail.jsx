"use client";

import { useState, useEffect } from "react";

export default function RoomDetail({ eventId, roomId, onBack }) {
    const [room,    setRoom]    = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);

    useEffect(() => {
        if (!eventId || !roomId) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        setError(null);

        fetch(`/api/events/${eventId}/rooms/${roomId}`)
            .then((res) => {
                if (res.status === 404) throw new Error("Salle introuvable.");
                if (!res.ok) throw new Error(`Erreur ${res.status}`);
                return res.json();
            })
            .then(setRoom)
            .catch((e)  => setError(e.message))
            .finally(() => setLoading(false));
    }, [eventId, roomId]);

    // ── Chargement ──
    if (loading) return (
        <div style={S.center}>
            <p style={S.muted}>Chargement de la salle…</p>
        </div>
    );

    // ── Erreur ──
    if (error) return (
        <div style={S.center}>
            <p style={S.errorText}>{error}</p>
            {onBack && (
                <button style={S.backBtn} onClick={onBack}>← Retour</button>
            )}
        </div>
    );

    const sessions = room.sessions ?? [];

    return (
        <div style={S.wrapper}>

            {onBack && (
                <button style={S.backBtn} onClick={onBack}>
                    ← Retour aux salles
                </button>
            )}

            <div style={S.hero}>
                <h1 style={S.heroTitle}>{room.name}</h1>

                <div style={S.metaRow}>
                    {room.location && (
                        <span style={S.metaItem}>📍 {room.location}</span>
                    )}
                    {room.capacity > 0 && (
                        <span style={S.metaItem}>👥 {room.capacity} places</span>
                    )}
                    <span style={S.metaItem}>
            🗓 {sessions.length} session{sessions.length !== 1 ? "s" : ""}
          </span>
                </div>
            </div>

            <div style={S.section}>
                <h2 style={S.sectionTitle}>Sessions programmées</h2>

                {sessions.length === 0 ? (
                    <p style={S.muted}>Aucune session programmée pour cette salle.</p>
                ) : (
                    <div style={S.sessionList}>
                        {sessions.map((session, i) => {
                            const timeLabel = session.start_time
                                ? `${fmt(session.start_time)}${session.end_time ? ` – ${fmt(session.end_time)}` : ""}`
                                : null;

                            return (
                                <div key={session.id_session ?? session.id ?? i} style={S.sessionCard}>

                                    <div style={S.sessionNum}>{i + 1}</div>

                                    <div style={S.sessionBody}>
                                        <p style={S.sessionTitle}>
                                            {session.title ?? session.name ?? "Session"}
                                        </p>

                                        {timeLabel && (
                                            <span style={S.sessionMeta}>🕐 {timeLabel}</span>
                                        )}

                                        {session.speaker && (
                                            <span style={S.sessionMeta}>🎤 {session.speaker}</span>
                                        )}

                                        {session.description && (
                                            <p style={S.sessionDesc}>{session.description}</p>
                                        )}
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

        </div>
    );
}

function fmt(dateStr) {
    try {
        return new Date(dateStr).toLocaleTimeString("fr-FR", {
            hour:   "2-digit",
            minute: "2-digit",
        });
    } catch {
        return dateStr;
    }
}

const S = {
    wrapper: {
        maxWidth:      680,
        margin:        "0 auto",
        padding:       "32px 24px",
        fontFamily:    "'DM Sans', sans-serif",
        display:       "flex",
        flexDirection: "column",
        gap:           24,
    },

    backBtn: {
        background:  "none",
        border:      "none",
        fontSize:    13,
        fontWeight:  600,
        color:       "#5C5B57",
        cursor:      "pointer",
        padding:     0,
        fontFamily:  "inherit",
        width:       "fit-content",
    },

    hero: {
        background:   "#2B2B2B",
        borderRadius: 16,
        padding:      "28px 24px",
        display:      "flex",
        flexDirection:"column",
        gap:          12,
    },
    heroTitle: {
        fontFamily:    "'Syne', sans-serif",
        fontSize:      28,
        fontWeight:    800,
        color:         "#fff",
        letterSpacing: "-0.02em",
        margin:        0,
    },
    metaRow: {
        display:  "flex",
        gap:      16,
        flexWrap: "wrap",
    },
    metaItem: {
        fontSize: 13,
        color:    "#908F83",
    },
    section: {
        background:    "#FEFEFE",
        border:        "1px solid #E0DED4",
        borderRadius:  16,
        padding:       "20px 22px",
        display:       "flex",
        flexDirection: "column",
        gap:           14,
    },
    sectionTitle: {
        fontFamily:    "'Syne', sans-serif",
        fontSize:      16,
        fontWeight:    700,
        color:         "#2B2B2B",
        margin:        0,
        letterSpacing: "-0.01em",
    },

    sessionList: {
        display:       "flex",
        flexDirection: "column",
        gap:           10,
    },
    sessionCard: {
        display:      "flex",
        gap:          14,
        alignItems:   "flex-start",
        background:   "#F7F6F0",
        borderRadius: 12,
        padding:      "14px 16px",
    },
    sessionNum: {
        flexShrink:     0,
        width:          28,
        height:         28,
        borderRadius:   8,
        background:     "rgba(160,164,247,.2)",
        color:          "#A0A4F7",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontSize:       13,
        fontWeight:     700,
    },
    sessionBody: {
        flex:          1,
        display:       "flex",
        flexDirection: "column",
        gap:           5,
    },
    sessionTitle: {
        fontSize:  14,
        fontWeight:600,
        color:     "#2B2B2B",
        margin:    0,
    },
    sessionMeta: {
        fontSize: 12,
        color:    "#908F83",
    },
    sessionDesc: {
        fontSize:   12,
        color:      "#5C5B57",
        margin:     0,
        lineHeight: 1.5,
    },

    center: {
        textAlign:  "center",
        padding:    "48px 24px",
        fontFamily: "'DM Sans', sans-serif",
        display:    "flex",
        flexDirection: "column",
        alignItems: "center",
        gap:        16,
    },
    muted:     { fontSize: 14, color: "#908F83", margin: 0 },
    errorText: { fontSize: 14, color: "#e05c5c", margin: 0 },
};
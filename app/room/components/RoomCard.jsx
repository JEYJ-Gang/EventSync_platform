"use client";

export default function RoomCard({ room, onClick }) {
    const sessions = room.sessions ?? [];
    const capacity = room.capacity ?? 0;

    return (
        <div
            onClick={onClick}
            style={{
                background:   "#FEFEFE",
                border:       "1px solid #E0DED4",
                borderRadius: 16,
                overflow:     "hidden",
                cursor:       onClick ? "pointer" : "default",
                transition:   "box-shadow .2s",
                fontFamily:   "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => { if (onClick) e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
        >
            {/* Barre accent en haut */}
            <div style={{ height: 4, background: "#A0A4F7" }} />

            <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>

                {/* Nom */}
                <h3 style={{
                    fontFamily:    "'Syne', sans-serif",
                    fontSize:      16,
                    fontWeight:    700,
                    color:         "#2B2B2B",
                    letterSpacing: "-0.01em",
                    margin:        0,
                }}>
                    {room.name}
                </h3>

                {room.location && (
                    <span style={{ fontSize: 12, color: "#908F83" }}>
            📍 {room.location}
          </span>
                )}

                {capacity > 0 && (
                    <span style={{
                        display:      "inline-block",
                        background:   "#F7F6F0",
                        borderRadius: 20,
                        padding:      "3px 10px",
                        fontSize:     12,
                        color:        "#5C5B57",
                        fontWeight:   500,
                        width:        "fit-content",
                    }}>
            👥 {capacity} places
          </span>
                )}

                <span style={{ fontSize: 12, color: "#908F83" }}>
          🗓 {sessions.length} session{sessions.length !== 1 ? "s" : ""} programmée{sessions.length !== 1 ? "s" : ""}
        </span>

                {/* Lien détail */}
                {onClick && (
                    <span style={{
                        fontSize:   12,
                        fontWeight: 600,
                        color:      "#A0A4F7",
                        marginTop:  4,
                    }}>
            Voir le détail →
          </span>
                )}
            </div>
        </div>
    );
}
"use client";

import { useState } from "react";
import RoomList   from "./components/RoomList";
import RoomDetail from "./components/RoomDetail";

export default function RoomsPage({ searchParams }) {
    const eventId = searchParams?.eventId ?? 1;

    const [selectedRoom, setSelectedRoom] = useState(null);

    return (
        <div style={S.shell}>

            {/* Titre */}
            <div style={S.header}>
                <h1 style={S.title}>
                    {selectedRoom ? selectedRoom.name : "Salles de l'événement"}
                </h1>
                <p style={S.sub}>
                    {selectedRoom
                        ? "Détail de la salle et sessions programmées"
                        : "Consultez les salles disponibles pour cet événement"}
                </p>
            </div>

            {/* Liste ou Détail */}
            {selectedRoom ? (
                <RoomDetail
                    eventId={eventId}
                    roomId={selectedRoom.id_room}
                    onBack={() => setSelectedRoom(null)}
                />
            ) : (
                <RoomList
                    eventId={eventId}
                    onSelect={(room) => setSelectedRoom(room)}
                />
            )}

        </div>
    );
}

const S = {
    shell: {
        minHeight:  "100vh",
        background: "#F7F6F0",
        fontFamily: "'DM Sans', sans-serif",
        padding:    "40px 24px",
    },
    header: {
        maxWidth:  680,
        margin:    "0 auto 32px",
        textAlign: "center",
    },
    title: {
        fontFamily:    "'Syne', sans-serif",
        fontSize:      32,
        fontWeight:    800,
        color:         "#2B2B2B",
        letterSpacing: "-0.02em",
        margin:        0,
        marginBottom:  8,
    },
    sub: {
        fontSize: 14,
        color:    "#908F83",
        margin:   0,
    },
};
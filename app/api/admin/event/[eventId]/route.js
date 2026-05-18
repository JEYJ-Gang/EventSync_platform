import { NextResponse } from "next/server";
import { eventService } from "../../../../../service/event.service";
import { verifyToken } from "@/lib/jwt";

export async function DELETE(req, { params }) {
    try {
        const authHeader = req.headers.get("authorization");

        console.log("AUTH HEADER:", authHeader);

        if (!authHeader) {
            return NextResponse.json(
                { message: "Missing token" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];

        console.log("TOKEN:", token);

        const decoded = verifyToken(token);

        console.log("DECODED:", decoded);

        if (!decoded || decoded.role?.trim().toUpperCase() !== "ADMIN") {
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            );
        }

        const { eventId } = await params;

        await eventService.deleteEvent(Number(eventId));

        return NextResponse.json(
            { message: "Event deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.log("ERROR:", error);
        return NextResponse.json(
            {
                code: "INTERNAL_ERROR",
                message: "Erreur serveur",
            },
            { status: 500 }
        );
    }
}

export async function PUT(req, { params }) {
    try {

        const body = await req.json();

        const authHeader = req.headers.get("authorization");

        const token = authHeader.split(" ")[1];

        const  {eventId} = await params; 
        const updatedEvent = await eventService.updateEvent({
            eventId, 
            body,
            token,
        });

        return NextResponse.json(updatedEvent, {
            status: 200,
        });

    } catch (error) {

        return NextResponse.json(
            {
                message: error.message || "Internal server error",
            },
            {
                status: error.status || 500,
            }
        );
    }
}
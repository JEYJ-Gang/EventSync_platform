import { NextResponse } from "next/server";
import { eventService } from "../../../../../service/event.service";
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

        const { eventId } = params;

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
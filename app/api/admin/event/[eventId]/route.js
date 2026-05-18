import { NextResponse } from "next/server";
import { eventService } from "@/service/event.service";
import { verifyToken } from "@/lib/jwt";

export async function DELETE(req, context) {
    try {
        const params = await context.params;

        console.log("PARAMS:", params);
        console.log("URL:", req.url);

        const authHeader = req.headers.get("authorization");

        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json(
                { message: "Missing token" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);

        if (!decoded || decoded.role?.toUpperCase() !== "ADMIN") {
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            );
        }

        const eventId = params.eventId;

        if (!eventId) {
            return NextResponse.json(
                { message: "Missing eventId" },
                { status: 400 }
            );
        }

        await eventService.deleteEvent(Number(eventId));

        return NextResponse.json(
            { message: "Event deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                code: "INTERNAL_ERROR",
                message: "Erreur serveur",
            },
            { status: 500 }
        );
    }
}
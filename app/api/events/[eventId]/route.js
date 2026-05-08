import { NextResponse } from "next/server";
import { eventService } from "../../../../service/event.service";

export async function GET(request, { params }) {
    try {
        const { eventId } = await params;

        console.log("EVENT ID:", eventId);

        if (!eventId) {
            return NextResponse.json(
                {
                    code: "INVALID_ID",
                    message: "eventId manquant",
                },
                { status: 422 }
            );
        }

        const event = await eventService.getEventById(eventId);

        return NextResponse.json(event, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            {
                code: error.code || "INTERNAL_ERROR",
                message: error.message || "Erreur serveur",
            },
            { status: error.status || 500 }
        );
    }
}
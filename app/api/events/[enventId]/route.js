import { NextResponse } from "next/server";
import { eventService } from "@/service/event.service";

export async function GET(request, { params }) {
    const eventId = params?.eventId;

    if (!eventId) {
        return NextResponse.json(
            {
                code: "Invalid_Id",
                message: "id requis",
            },
            { status: 422 }
        );
    }

    const event = await eventService.getEventById(eventId);

    return NextResponse.json(event, { status: 200 });
}
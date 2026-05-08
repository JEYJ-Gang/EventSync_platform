import { NextResponse } from "next/server";
import { eventService } from "../../../../../service/event.service";

export async function GET(request, context) {
  try {
    const { params } = context;

    const resolvedParams = await params;

    const eventId = parseInt(resolvedParams.eventId);

    console.log("eventId =", eventId);

    const { searchParams } = new URL(request.url);

    const roomId = searchParams.get("room_id");
    const date = searchParams.get("date");

    const result = await eventService.getEventSchedule({
      eventId,
      roomId,
      date,
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        code: error.code || "INTERNAL_ERROR",
        message: error.message,
      },
      { status: error.status || 500 }
    );
  }
}
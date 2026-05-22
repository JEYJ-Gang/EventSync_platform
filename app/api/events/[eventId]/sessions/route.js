import { NextResponse } from "next/server";
import { sessionService } from "../../../../../service/session.service";
import { verifyAdminToken } from "../../../../../lib/auth";
 
export async function GET(request, context) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    const eventId = parseInt(resolvedParams.eventId);
 
    if (isNaN(eventId)) {
      return NextResponse.json(
        {
          code: "INVALID_ID",
          message: "eventId manquant"
        },
        { status: 422 }
      );
    }
 
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("room_id");
    const liveOnly = searchParams.get("live_only");
 
    const result = await sessionService.listSessionsByEvent(eventId, { 
      roomId, 
      liveOnly 
    });
 
    return NextResponse.json(result, { status: 200 });
 
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        code: error.code || "INTERNAL_ERROR",
        message: error.message || "Erreur serveur",
      },
      { status: error.status || 500 }
    );
  }
}
 
export async function POST(request, context) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    const eventId = parseInt(resolvedParams.eventId);
 
    if (isNaN(eventId)) {
      return NextResponse.json(
        {
          code: "INVALID_ID",
          message: "eventId manquant"
        },
        { status: 422 }
      );
    }
 
    const admin = await verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json(
        { code: "FORBIDDEN", message: "Access denied." },
        { status: 403 }
      );
    }
 
    const body = await request.json();
    const session = await sessionService.createSession(eventId, body);
 
    return NextResponse.json(session, { status: 201 });
 
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        code: error.code || "INTERNAL_ERROR",
        message: error.message || "Erreur serveur",
      },
      { status: error.status || 500 }
    );
  }
}

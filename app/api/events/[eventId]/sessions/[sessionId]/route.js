import { NextResponse } from "next/server";
import { sessionService } from "../../../../../../service/session.service";
import { verifyAdminToken } from "../../../../../../lib/auth";
 
export async function GET(request, context) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    const sessionId = parseInt(resolvedParams.sessionId);
 
    if (isNaN(sessionId)) {
      return NextResponse.json(
        {
          code: "INVALID_ID",
          message: "sessionId invalide"
        },
        { status: 422 }
      );
    }
 
    const session = await sessionService.getSessionById(sessionId);
 
    return NextResponse.json(session, { status: 200 });
 
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
 
export async function PUT(request, context) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    const sessionId = parseInt(resolvedParams.sessionId);
 
    if (isNaN(sessionId)) {
      return NextResponse.json(
        {
          code: "INVALID_ID",
          message: "sessionId invalide"
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
    const session = await sessionService.updateSession(sessionId, body);
 
    return NextResponse.json(session, { status: 200 });
 
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
 
export async function DELETE(request, context) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    const sessionId = parseInt(resolvedParams.sessionId);
 
    if (isNaN(sessionId)) {
      return NextResponse.json(
        {
          code: "INVALID_ID",
          message: "sessionId invalide"
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
 
    await sessionService.deleteSession(sessionId);
 
    return new NextResponse(null, { status: 204 });
 
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

import { NextResponse } from "next/server";
import { sessionService } from "../../../../../../service/session.service";
 
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

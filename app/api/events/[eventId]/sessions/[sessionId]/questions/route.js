import { NextResponse } from "next/server";
import { sessionService } from "../../../../../../../service/session.service";
 
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
 
    const questions = await sessionService.listQuestions(sessionId);
 
    return NextResponse.json(questions, { status: 200 });
 
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
 
    const body = await request.json();
    const question = await sessionService.createQuestion(sessionId, body);
 
    return NextResponse.json(question, { status: 201 });
 
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

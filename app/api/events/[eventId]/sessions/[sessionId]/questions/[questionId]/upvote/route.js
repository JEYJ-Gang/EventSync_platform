import { NextResponse } from "next/server";
import { sessionService } from "@/service/session.service";

 
export async function POST(request, context) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    const sessionId = parseInt(resolvedParams.sessionId);
    const questionId = parseInt(resolvedParams.questionId);
 
    if (isNaN(sessionId) || isNaN(questionId)) {
      return NextResponse.json(
        {
          code: "INVALID_ID",
          message: "sessionId ou questionId invalide"
        },
        { status: 422 }
      );
    }
 
    const question = await sessionService.upvoteQuestion(questionId, sessionId);
 
    return NextResponse.json(question, { status: 200 });
 
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
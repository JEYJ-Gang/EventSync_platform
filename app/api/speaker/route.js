import { NextResponse } from "next/server";
import { speakerService } from "../../../service/speaker.service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const per_page = parseInt(searchParams.get("per_page") || "20");

    const result = await speakerService.listSpeakers({
      page,
      per_page,
    });

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        code: error.code || "INTERNAL_ERROR",
        message: error.message || "Erreur serveur",
      },
      {
        status: error.status || 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const speaker = await speakerService.createSpeaker(body);

    return NextResponse.json(speaker, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        code: "CREATE_SPEAKER_ERROR",
        message: error.message || "Erreur lors de la création",
      },
      { status: 500 }
    );
  }
}
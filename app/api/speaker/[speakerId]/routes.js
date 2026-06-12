import { NextResponse } from "next/server";
import { speakerService } from "@/service/speaker.service";

export async function GET(request, { params }) {
  try {
    const { speakerId } = params;

    const speaker = await speakerService.getSpeakerById(
      Number(speakerId)
    );

    if (!speaker) {
      return NextResponse.json(
        { message: "Speaker not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(speaker, { status: 200 });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        code: "INTERNAL_ERROR",
        message: "Erreur serveur",
      },
      { status: 500 }
    );
  }
}
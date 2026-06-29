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

export async function DELETE(request, { params }) {
  try {
    const { speakerId } = await params;

    await speakerService.deleteSpeaker(Number(speakerId));

    return NextResponse.json(
      { message: "Speaker deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        code: "DELETE_SPEAKER_ERROR",
        message: error.message || "Erreur suppression speaker",
      },
      { status: 500 }
    );
  }
}
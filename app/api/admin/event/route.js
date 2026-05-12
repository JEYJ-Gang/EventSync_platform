import { NextResponse } from "next/server";
import { eventService } from "../../../../service/event.service.js";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function POST(req) {
    try {
        const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { message: "Missing or invalid authorization header" },
                { status: 401 }
            );
        }

        const token = authHeader.replace("Bearer", "").trim();

        const decoded = verifyToken(token);

        if (!decoded) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }

        if (decoded.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Forbidden" },
                { status: 403 }
            );
        }

        const body = await req.json();

        const event = await eventService.createEvent(body);

        return NextResponse.json(event, { status: 201 });

    } catch (error) {
        console.error("POST /event error:", error);

        return NextResponse.json(
            {
                code: "INTERNAL_ERROR",
                message: "Erreur serveur",
            },
            { status: 500 }
        );
    }
}
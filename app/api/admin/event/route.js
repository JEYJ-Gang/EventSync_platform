import { NextResponse } from "next/server";
import { eventService } from "../../../../service/event.service.js";
import { verifyToken } from "@/lib/jwt";

export async function POST(req) {
    try {
        const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");

        if (!authHeader) {
            return NextResponse.json(
                { message: "Missing token" },
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
        return NextResponse.json(
            {
                code: "INTERNAL_ERROR",
                message: "Erreur serveur",
            },
            { status: 500 }
        );
    }
}
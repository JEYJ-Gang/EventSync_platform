import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const organizer = await prisma.organizer.findUnique({
            where: { email },
        });

        if (!organizer) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            organizer.password_hash
        );

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = generateToken(organizer);

        return NextResponse.json({
            message: "Login successful",
            access_token: token,
            token_type: "Bearer",
        });

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
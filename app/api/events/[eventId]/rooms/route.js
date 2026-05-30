import { NextResponse } from 'next/server';
// import { verifyAdminToken } from '@/lib/auth'; // Commenté pour les tests
import * as roomService from '../../../../../service/roomService';

export async function GET(request, { params }) {
    const { eventId } = await params;
    const rooms = await roomService.listRoomsByEvent(eventId);
    return NextResponse.json({ data: rooms });
}

export async function POST(request, { params }) {
    // const admin = await verifyAdminToken(request); // Commenté pour les tests
    // if (!admin) return NextResponse.json({ code: 'FORBIDDEN' }, { status: 403 }); // Commenté pour les tests

    try {
        const body = await request.json();
        const room = await roomService.createRoom(body);
        return NextResponse.json(room, { status: 201 });

    } catch (error) {
        return NextResponse.json({ code: 'INTERNAL_ERROR', message: error.message }, { status: 500 });
    }
}
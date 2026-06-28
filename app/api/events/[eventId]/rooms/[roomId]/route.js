import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import * as roomService from '../../../../../../service/roomService';

export async function GET(request, { params }) {
    const { roomId } = await params;
    const room = await roomService.getRoomById(roomId);
    if (!room) return NextResponse.json({ code: 'NOT_FOUND' }, { status: 404 });
    return NextResponse.json(room);
}

export async function PUT(request, { params }) {
    const { roomId } = await params;
    const admin = await verifyAdminToken(request);
    if (!admin) return NextResponse.json({ code: 'FORBIDDEN' }, { status: 403 });

    const body = await request.json();
    const room = await roomService.updateRoom(roomId, body);
    return NextResponse.json(room);
}

export async function DELETE(request, { params }) {
    const { roomId } = await params;
    const admin = await verifyAdminToken(request);
    if (!admin) return NextResponse.json({ code: 'FORBIDDEN' }, { status: 403 });

    try {
        await roomService.deleteRoom(roomId);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        if (error.code === 'P2003')
            return NextResponse.json({ code: 'CONFLICT', message: 'Room in use' }, { status: 409 });
        return NextResponse.json({ code: 'INTERNAL_ERROR' }, { status: 500 });
    }
}
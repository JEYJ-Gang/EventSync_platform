import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import * as sessionService from '@/services/sessionService';

export async function GET(request, { params }) {
  const { eventId } = params;
  const { searchParams } = new URL(request.url);
  const room_id = searchParams.get('room_id');
  const live_only = searchParams.get('live_only');
  const date = searchParams.get('date'); // pour compatibilité schedule, mais ici pas utilisé

  try {
    const sessions = await sessionService.listSessionsByEvent(eventId, {
      room_id,
      live_only: live_only !== null ? live_only === 'true' : undefined,
    });
    return NextResponse.json({ data: sessions, total: sessions.length });
  } catch (error) {
    if (error.message === 'Event not found')
      return NextResponse.json({ code: 'NOT_FOUND', message: "L'événement est introuvable." }, { status: 404 });
    return NextResponse.json({ code: 'INTERNAL_ERROR', message: error.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  const { eventId } = params;
  const admin = await verifyAdminToken(request);
  if (!admin) return NextResponse.json({ code: 'FORBIDDEN', message: 'Accès réservé aux organisateurs.' }, { status: 403 });

  try {
    const body = await request.json();
    const session = await sessionService.createSession(eventId, body);
    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    if (error.message === 'Event not found')
      return NextResponse.json({ code: 'NOT_FOUND', message: "L'événement est introuvable." }, { status: 404 });
    if (error.code === 'P2002') // contrainte unique Prisma
      return NextResponse.json({ code: 'UNPROCESSABLE_ENTITY', message: 'Données invalides.' }, { status: 422 });
    return NextResponse.json({ code: 'INTERNAL_ERROR', message: error.message }, { status: 500 });
  }
}
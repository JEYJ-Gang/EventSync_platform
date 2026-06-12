import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import * as sessionService from '@/services/sessionService';

export async function GET(request, { params }) {
  const { eventId, sessionId } = params;

  try {
    const session = await sessionService.getSessionById(eventId, sessionId);
    if (!session) return NextResponse.json({ code: 'NOT_FOUND', message: 'Session introuvable.' }, { status: 404 });
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ code: 'INTERNAL_ERROR', message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { eventId, sessionId } = params;
  const admin = await verifyAdminToken(request);
  if (!admin) return NextResponse.json({ code: 'FORBIDDEN', message: 'Accès réservé aux organisateurs.' }, { status: 403 });

  try {
    const body = await request.json();
    const session = await sessionService.updateSession(eventId, sessionId, body);
    return NextResponse.json(session);
  } catch (error) {
    if (error.message === 'Session not found')
      return NextResponse.json({ code: 'NOT_FOUND', message: 'Session introuvable.' }, { status: 404 });
    return NextResponse.json({ code: 'INTERNAL_ERROR', message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { eventId, sessionId } = params;
  const admin = await verifyAdminToken(request);
  if (!admin) return NextResponse.json({ code: 'FORBIDDEN', message: 'Accès réservé aux organisateurs.' }, { status: 403 });

  try {
    await sessionService.deleteSession(eventId, sessionId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error.message === 'Session not found')
      return NextResponse.json({ code: 'NOT_FOUND', message: 'Session introuvable.' }, { status: 404 });
    return NextResponse.json({ code: 'INTERNAL_ERROR', message: error.message }, { status: 500 });
  }
}
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


function addLiveFlag(session) {
  const now = new Date();
  return {
    ...session,
    is_live: now >= session.start_time && now <= session.end_time,
  };
}

function toSummary(session) {
  return {
    id: session.id,
    title: session.title,
    start_time: session.start_time,
    end_time: session.end_time,
    is_live: addLiveFlag(session).is_live,
    room: session.room,
    speakers: session.speakers.map(s => ({
      id: s.id,
      full_name: s.full_name,
      photo_url: s.photo_url,
    })),
  };
}

export async function listSessionsByEvent(eventId, { room_id, live_only, date } = {}) {
  const where = { eventId };

  if (room_id) where.roomId = room_id;
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    where.start_time = { gte: start, lt: end };
  }

  const sessions = await prisma.session.findMany({
    where,
    include: {
      room: true,
      speakers: { select: { id: true, full_name: true, photo_url: true } },
    },
    orderBy: { start_time: 'asc' },
  });

  let enriched = sessions.map(s => ({ ...s, is_live: addLiveFlag(s).is_live }));

  if (live_only !== undefined) {
    const live = live_only === true || live_only === 'true';
    enriched = enriched.filter(s => s.is_live === live);
  }

  return enriched.map(toSummary);
}

export async function getSessionById(eventId, sessionId) {
  const session = await prisma.session.findFirst({
    where: { id: sessionId, eventId },
    include: {
      room: true,
      speakers: { select: { id: true, full_name: true, photo_url: true } },
      questions: {
        orderBy: { upvote_count: 'desc' },
        select: { id: true, content: true, author_name: true, upvote_count: true, created_at: true },
      },
    },
  });

  if (!session) return null;

  const enriched = addLiveFlag(session);
  return { ...enriched, questions: enriched.is_live ? enriched.questions : [] };
}

export async function createSession(eventId, data) {
  const { speaker_ids, room_id, ...sessionData } = data;

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) throw new Error('Event not found');

  const session = await prisma.session.create({
    data: {
      ...sessionData,
      eventId,
      roomId: room_id,
      speakers: { connect: speaker_ids.map(id => ({ id })) },
    },
    include: {
      room: true,
      speakers: { select: { id: true, full_name: true, photo_url: true } },
    },
  });

  return addLiveFlag(session);
}

export async function updateSession(eventId, sessionId, data) {
  const { speaker_ids, room_id, ...sessionData } = data;

  const session = await prisma.session.findFirst({ where: { id: sessionId, eventId } });
  if (!session) throw new Error('Session not found');

  const updated = await prisma.session.update({
    where: { id: sessionId },
    data: {
      ...sessionData,
      roomId: room_id,
      speakers: speaker_ids ? { set: [], connect: speaker_ids.map(id => ({ id })) } : undefined,
    },
    include: {
      room: true,
      speakers: { select: { id: true, full_name: true, photo_url: true } },
    },
  });

  return addLiveFlag(updated);
}

export async function deleteSession(eventId, sessionId) {
  const session = await prisma.session.findFirst({ where: { id: sessionId, eventId } });
  if (!session) throw new Error('Session not found');

  await prisma.session.delete({ where: { id: sessionId } });
  return true;
}
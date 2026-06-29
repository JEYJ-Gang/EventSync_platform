import { prisma } from '../lib/prisma';

export const sessionRepository = {
  async findByEvent({ eventId, roomId, date }) {
    return prisma.session.findMany({
      where: {
        id_event: eventId,
        ...(roomId && { id_room: parseInt(roomId) }),
        ...(date && {
          start_time: {
            gte: new Date(date + "T00:00:00"),
            lte: new Date(date + "T23:59:59")
          }
        })
      },
      include: {
        room: true,
        intervenes: { include: { speaker: true } },
        questions: { orderBy: { upvote: 'desc' } },
      },
      orderBy: { start_time: "asc" }
    });
  },

  async findById(sessionId) {
    return prisma.session.findUnique({
      where: { id_session: sessionId },
      include: {
        room: true,
        intervenes: { include: { speaker: true } },
        questions: { orderBy: { upvote: 'desc' } },
      },
    });
  },

  async create(data) {
    const { title, description, start_time, end_time, room_id, capacity, speaker_ids, eventId } = data;
    return prisma.session.create({
      data: {
        id_event: eventId,
        title,
        description,
        start_time: new Date(start_time),
        end_time: new Date(end_time),
        id_room: parseInt(room_id),
        capacity: capacity || null,
        intervenes: {
          create: speaker_ids.map(speakerId => ({
            id_speaker: parseInt(speakerId),
          })),
        },
      },
      include: {
        room: true,
        intervenes: { include: { speaker: true } },
        questions: { orderBy: { upvote: 'desc' } },
      },
    });
  },

  async update(sessionId, data) {
    const { title, description, start_time, end_time, room_id, capacity, speaker_ids } = data;

    if (speaker_ids) {
      await prisma.intervene.deleteMany({ where: { id_session: sessionId } });
    }

    return prisma.session.update({
      where: { id_session: sessionId },
      data: {
        title,
        description,
        start_time: start_time ? new Date(start_time) : undefined,
        end_time: end_time ? new Date(end_time) : undefined,
        id_room: room_id ? parseInt(room_id) : undefined,
        capacity,
        intervenes: speaker_ids
          ? { create: speaker_ids.map(speakerId => ({ id_speaker: parseInt(speakerId) })) }
          : undefined,
      },
      include: {
        room: true,
        intervenes: { include: { speaker: true } },
        questions: { orderBy: { upvote: 'desc' } },
      },
    });
  },

  async delete(sessionId) {
    await prisma.question.deleteMany({ where: { id_session: sessionId } });
    await prisma.intervene.deleteMany({ where: { id_session: sessionId } });
    return prisma.session.delete({ where: { id_session: sessionId } });
  },

  async findQuestionsBySession(sessionId) {
    return prisma.question.findMany({
      where: { id_session: sessionId },
      orderBy: { upvote: 'desc' },
    });
  },

  async createQuestion(sessionId, { content, author_name }) {
    return prisma.question.create({
      data: {
        id_session: sessionId,
        content,
        author_name: author_name || null,
      },
    });
  },

  async findQuestionById(questionId, sessionId) {
    return prisma.question.findFirst({
      where: { id_question: questionId, id_session: sessionId },
    });
  },

  async upvoteQuestion(questionId) {
    return prisma.question.update({
      where: { id_question: questionId },
      data: { upvote: { increment: 1 } },
    });
  },
};
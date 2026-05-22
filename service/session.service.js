import { sessionRepository } from '../repository/session.repository';
import prisma from '../lib/prisma';

function mapSession(session) {
  const now = new Date();
  return {
    id: session.id_session,
    title: session.title,
    description: session.description,
    start_time: session.start_time,
    end_time: session.end_time,
    capacity: session.capacity,
    is_live: now >= session.start_time && now <= session.end_time,
    room: session.room
      ? {
          id: session.room.id_room,
          name: session.room.name,
        }
      : null,
    speakers: (session.intervenes || []).map(i => ({
      id: i.speaker.id_speaker,
      full_name: `${i.speaker.first_name} ${i.speaker.last_name}`,
      photo_url: i.speaker.photo_url,
    })),
    questions: (session.questions || []).map(q => ({
      id: q.id_question,
      content: q.content,
      author_name: q.author_name,
      upvote_count: q.upvote_count,
      created_at: q.created_at,
    })),
  };
}

export const sessionService = {
  async getEventSchedule({ eventId, roomId, date }) {
    if (isNaN(eventId)) {
      throw {
        status: 422,
        code: "UNPROCESSABLE_ENTITY",
        message: "Invalid eventId"
      };
    }

    const sessions = await sessionRepository.findByEvent({
      eventId,
      roomId,
      date,
    });

    if (!sessions.length) {
      throw {
        status: 404,
        code: "NOT_FOUND",
        message: "No sessions found"
      };
    }

    const now = new Date();
    const mapped = sessions.map(session => ({
      id: session.id_session,
      title: session.title,
      description: session.description,
      start_time: session.start_time,
      end_time: session.end_time,
      is_live: now >= session.start_time && now <= session.end_time,
      room: {
        id: session.room.id_room,
        name: session.room.name
      },
      speakers: session.intervenes.map(i => ({
        id: i.speaker.id_speaker,
        full_name: `${i.speaker.first_name} ${i.speaker.last_name}`,
        photo_url: i.speaker.photo_url
      }))
    }));

    return {
      data: mapped,
      total: mapped.length
    };
  },

  async listSessionsByEvent(eventId, { roomId, liveOnly }) {
    const event = await prisma.event.findUnique({ 
      where: { id_event: eventId } 
    });
    
    if (!event) {
      throw { 
        status: 404, 
        code: 'NOT_FOUND', 
        message: 'Event not found' 
      };
    }

    const sessions = await sessionRepository.findByEvent({
      eventId,
      roomId,
    });

    let mapped = sessions.map(mapSession);
    
    if (liveOnly !== undefined) {
      mapped = mapped.filter(s => s.is_live === (liveOnly === 'true' || liveOnly === true));
    }
    
    return { 
      data: mapped, 
      total: mapped.length 
    };
  },

  async getSessionById(sessionId) {
    if (isNaN(sessionId)) {
      throw {
        status: 422,
        code: "INVALID_ID",
        message: "sessionId invalide"
      };
    }

    const session = await sessionRepository.findById(sessionId);
    
    if (!session) {
      throw { 
        status: 404, 
        code: 'NOT_FOUND', 
        message: 'Session not found' 
      };
    }
    
    return mapSession(session);
  },

  async createSession(eventId, payload) {
    if (!payload.title || !payload.start_time || !payload.end_time || !payload.room_id || !payload.speaker_ids) {
      throw { 
        status: 422, 
        code: 'UNPROCESSABLE_ENTITY', 
        message: 'Missing required fields' 
      };
    }

    const startDate = new Date(payload.start_time);
    const endDate = new Date(payload.end_time);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw {
        status: 422,
        code: "INVALID_DATE",
        message: "Format de date invalide",
      };
    }

    if (startDate >= endDate) {
      throw {
        status: 422,
        code: "INVALID_DATE_RANGE",
        message: "start_time must be before end_time",
      };
    }

    const event = await prisma.event.findUnique({ 
      where: { id_event: eventId } 
    });
    
    if (!event) {
      throw { 
        status: 404, 
        code: 'NOT_FOUND', 
        message: 'Event not found' 
      };
    }

    const session = await sessionRepository.create({ 
      ...payload, 
      eventId 
    });
    
    return mapSession(session);
  },

  async updateSession(sessionId, payload) {
    if (isNaN(sessionId)) {
      throw {
        status: 422,
        code: "INVALID_ID",
        message: "sessionId invalide"
      };
    }

    const session = await sessionRepository.findById(sessionId);
    
    if (!session) {
      throw { 
        status: 404, 
        code: 'NOT_FOUND', 
        message: 'Session not found' 
      };
    }

    if (payload.start_time && payload.end_time) {
      const startDate = new Date(payload.start_time);
      const endDate = new Date(payload.end_time);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw {
          status: 422,
          code: "INVALID_DATE",
          message: "Format de date invalide",
        };
      }

      if (startDate >= endDate) {
        throw {
          status: 422,
          code: "INVALID_DATE_RANGE",
          message: "start_time must be before end_time",
        };
      }
    }

    const updated = await sessionRepository.update(sessionId, payload);
    
    return mapSession(updated);
  },

  async deleteSession(sessionId) {
    if (isNaN(sessionId)) {
      throw {
        status: 422,
        code: "INVALID_ID",
        message: "sessionId invalide"
      };
    }

    const session = await sessionRepository.findById(sessionId);
    
    if (!session) {
      throw { 
        status: 404, 
        code: 'NOT_FOUND', 
        message: 'Session not found' 
      };
    }

    await sessionRepository.delete(sessionId);
  },

  async listQuestions(sessionId) {
    if (isNaN(sessionId)) {
      throw {
        status: 422,
        code: "INVALID_ID",
        message: "sessionId invalide"
      };
    }

    const session = await sessionRepository.findById(sessionId);
    
    if (!session) {
      throw { 
        status: 404, 
        code: 'NOT_FOUND', 
        message: 'Session not found' 
      };
    }

    const now = new Date();
    const isLive = now >= session.start_time && now <= session.end_time;
    
    if (!isLive) {
      throw { 
        status: 409, 
        code: 'SESSION_NOT_LIVE', 
        message: 'Questions only available during live' 
      };
    }

    return await sessionRepository.findQuestionsBySession(sessionId);
  },

  async createQuestion(sessionId, payload) {
    if (isNaN(sessionId)) {
      throw {
        status: 422,
        code: "INVALID_ID",
        message: "sessionId invalide"
      };
    }

    if (!payload.content) {
      throw {
        status: 422,
        code: "UNPROCESSABLE_ENTITY",
        message: "content is required"
      };
    }

    const session = await sessionRepository.findById(sessionId);
    
    if (!session) {
      throw { 
        status: 404, 
        code: 'NOT_FOUND', 
        message: 'Session not found' 
      };
    }

    const now = new Date();
    const isLive = now >= session.start_time && now <= session.end_time;
    
    if (!isLive) {
      throw { 
        status: 409, 
        code: 'SESSION_NOT_LIVE', 
        message: 'Cannot post question outside live session' 
      };
    }

    return await sessionRepository.createQuestion(sessionId, payload);
  },

  async upvoteQuestion(questionId, sessionId) {
    if (isNaN(questionId) || isNaN(sessionId)) {
      throw {
        status: 422,
        code: "INVALID_ID",
        message: "questionId ou sessionId invalide"
      };
    }

    const session = await sessionRepository.findById(sessionId);
    
    if (!session) {
      throw { 
        status: 404, 
        code: 'NOT_FOUND', 
        message: 'Session not found' 
      };
    }

    const now = new Date();
    const isLive = now >= session.start_time && now <= session.end_time;
    
    if (!isLive) {
      throw { 
        status: 409, 
        code: 'SESSION_NOT_LIVE', 
        message: 'Upvote only during live session' 
      };
    }

    const question = await sessionRepository.findQuestionById(questionId, sessionId);
    
    if (!question) {
      throw { 
        status: 404, 
        code: 'NOT_FOUND', 
        message: 'Question not found' 
      };
    }

    return await sessionRepository.upvoteQuestion(questionId);
  },
};
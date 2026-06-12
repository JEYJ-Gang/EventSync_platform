import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function listRoomsByEvent(eventId) {
    return prisma.room.findMany({
        where: {
            sessions: {
                some: {
                    id_event: parseInt(eventId, 10)
                }
            }
        }
    });
}

export async function getRoomById(roomId) {
    return prisma.room.findUnique({
        where: {id_room: parseInt(roomId)},
        include: {sessions: true}
    });
}

export async function createRoom(data) {
    return prisma.room.create({data});
}

export async function updateRoom(roomId, data) {
    return prisma.room.update({
        where: {id_room: parseInt(roomId)},
        data
    });
}

export async function deleteRoom(roomId) {
    return prisma.room.delete({
        where: {id_room: parseInt(roomId)}
    });
}
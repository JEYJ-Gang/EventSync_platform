import { prisma } from "@/lib/prisma";

export const speakerRepository = {

    async listSpeakers({ page, per_page }) {
        const skip = (page - 1) * per_page;

        const speakers = await prisma.speaker.findMany({
            skip,
            take: per_page,
            orderBy: {
                id_speaker: "asc",
            },
        });

        return {
            data: speakers,
            page,
            per_page,
        };
    },

    async getSpeakerById(id) {
        return prisma.speaker.findUnique({
            where: {
                id_speaker: id,
            },
        });
    },

    async createSpeaker(data) {
        return prisma.speaker.create({
            data,
        });
    },

    async deleteSpeaker(id) {
        return prisma.speaker.delete({
            where: {
                id_speaker: id,
            },
        });
    },

};
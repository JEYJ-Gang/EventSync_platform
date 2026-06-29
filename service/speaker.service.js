import { speakerRepository } from "../repository/speaker.repository";

export const speakerService = {

    async listSpeakers({ page, per_page }) {
        return await speakerRepository.listSpeakers({
            page,
            per_page,
        });
    },

    async getSpeakerById(id) {
        return speakerRepository.getSpeakerById(id);
    },

    async createSpeaker(data) {
        if (!data?.first_name || !data?.last_name) {
            throw new Error("Speaker name is required");
        }

        return speakerRepository.createSpeaker(data);
    },

    async deleteSpeaker(id) {
        if (!id) {
            throw new Error("Speaker ID is required");
        }

        return speakerRepository.deleteSpeaker(id);
    },
};
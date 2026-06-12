import { speakerRepository } from "../repository/speaker.repository";

export const speakerService = {
  async listSpeakers({ page, per_page }) {
    return await speakerRepository.listSpeakers({
      page,
      per_page,
    });
  },
};
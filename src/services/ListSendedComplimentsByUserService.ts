import { getCustomRepository } from "typeorm";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";

export class ListSendedComplimentsByUserService {
  async execute(user_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository)

    const complimentsSended = await complimentsRepository.find({ user_sender: user_id })

    if (!complimentsSended) {
      throw new Error(`User did'nt send any compliments`)
    }

    return complimentsSended
  }
}

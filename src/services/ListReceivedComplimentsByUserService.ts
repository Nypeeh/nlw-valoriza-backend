import { getCustomRepository } from "typeorm";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";

export class ListReceivedComplimentsByUserService {
  async execute(user_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository)

    const complimentsReceived = await complimentsRepository.find({
      where: { user_receiver: user_id },
      relations: ['userSender', 'userReceiver', 'tag']
    })

    if (!complimentsReceived) {
      throw new Error(`User didn't received any compliments`)
    }

    return complimentsReceived
  }
}

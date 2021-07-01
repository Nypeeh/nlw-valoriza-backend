import { getCustomRepository } from "typeorm";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";
import { TagsRepository } from "../repositories/TagsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

interface IComplimentRequest {
  tag_id: string
  user_sender: string
  user_receiver: string
  message: string
}

export class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message
  }: IComplimentRequest) {
    if (!tag_id) throw new Error('Invalid tag_id')
    if (!user_sender) throw new Error('Invalid user_sender')
    if (!user_receiver) throw new Error('Invalid user_receiver')
    if (!message) throw new Error('Invalid message')

    if (user_sender === user_receiver)
      throw new Error(`You can't compliment yourself!`)

    const usersRepository = getCustomRepository(UsersRepository)
    const complimentsRepository = getCustomRepository(ComplimentsRepository)

    const userExists = await usersRepository.findOne(user_receiver)

    if (!userExists)
      throw new Error('User Receiver does not exists!')


    const compliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    })
    await complimentsRepository.save(compliment)

    return compliment
  }
}

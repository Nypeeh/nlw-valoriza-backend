import { getCustomRepository } from "typeorm";
import { TagsRepository } from "../repositories/TagsRepository";

export class CreateTagService {
  async execute(name: string) {
    if (!name)
      throw new Error('Invalid name')

    const tagsRepository = getCustomRepository(TagsRepository)

    const tagAlreadyExists = await tagsRepository.findOne({ name })

    if (tagAlreadyExists) {
      throw new Error('Tag already exists!')
    }

    const newTag = tagsRepository.create({ name })
    await tagsRepository.save(newTag)

    return newTag
  }
}

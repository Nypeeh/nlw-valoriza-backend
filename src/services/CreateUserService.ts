import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { hash } from 'bcryptjs'


interface IUserRequest {
  name: string
  email: string
  password: string
  admin?: boolean
}

export class CreateUserService {
  async execute({ name, email, password, admin = false }: IUserRequest) {
    if (!email) throw new Error('email field incorrect')
    if (!name) throw new Error('name field incorrect')
    if (!password) throw new Error('password field incorrect')


    const usersRepository = getCustomRepository(UsersRepository)

    const userAlreadyExists = await usersRepository.findOne({ email })

    if (userAlreadyExists) {
      throw new Error("User already exists")
    }

    const passwordHashed = await hash(password, 10)

    const user = usersRepository.create({
      name,
      email,
      password: passwordHashed,
      admin
    })

    await usersRepository.save(user)

    return user
  }
}

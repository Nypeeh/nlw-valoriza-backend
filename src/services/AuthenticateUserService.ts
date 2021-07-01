import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


interface IRequest {
  email: string
  password: string
}

const secretJWT = '29ea000d20029ff91924eb9b518dc1c0a9714a5f'

export class AuthenticateUserService {
  async execute({ email, password }: IRequest) {
    if (!email) throw new Error('email field incorrect')
    if (!password) throw new Error('password field incorrect')

    const usersRepository = getCustomRepository(UsersRepository)

    const userExists = await usersRepository.findOne({ where: { email }, select: ['password']})

    if (!userExists)
      throw new Error("Email/Password incorrect")

    const passwordCompare = await compare(password, userExists.password)

    if (!passwordCompare)
      throw new Error("Email/Password incorrect")

    // Logado

    const token = sign({
      email: userExists.email,
    }, secretJWT, {
      subject: userExists.id,
      expiresIn: '1d' // 1 dia
    })

    delete userExists.password

    const responseData = {
      user: userExists,
      token
    }

    return responseData
  }
}

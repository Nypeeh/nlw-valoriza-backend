import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const userID = request.user_id

  const usersRepository = getCustomRepository(UsersRepository)

  const { admin } = await usersRepository.findOne(userID)

  if (!admin) {
    throw new Error('User has not permission ADMIN')
  }

  return next()
}

import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";

export class ListUsersController {
  async handle(request: Request, response: Response) {
    const listUsersService = new ListUsersService()

    const user = await listUsersService.execute()

    return response.json(user)

  }
}

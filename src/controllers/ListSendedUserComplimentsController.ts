import { Request, Response } from "express";
import { ListSendedComplimentsByUserService } from "../services/ListSendedComplimentsByUserService";

export class ListSendedUserComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const listSendedUserComplimentsService = new ListSendedComplimentsByUserService()

    const complimentsSended = await listSendedUserComplimentsService.execute(user_id)

    return response.json(complimentsSended)

  }
}

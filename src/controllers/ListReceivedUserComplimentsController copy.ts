import { Request, Response } from "express";
import { ListReceivedComplimentsByUserService } from "../services/ListReceivedComplimentsByUserService";

export class ListReceivedUserComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const listReceivedUserComplimentsService = new ListReceivedComplimentsByUserService()

    const complimentsReceived = await listReceivedUserComplimentsService.execute(user_id)

    return response.json(complimentsReceived)

  }
}

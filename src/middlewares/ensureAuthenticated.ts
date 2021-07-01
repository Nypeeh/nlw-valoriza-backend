import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string
  email: string
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.headers.authorization

  if (!token)
    return response.status(401).json({ error: 'Token is missing' })

  const [, tokenFormated] = token.split(' ')

  try {
    const { sub: userID } = verify(
      tokenFormated,
      '29ea000d20029ff91924eb9b518dc1c0a9714a5f'
    ) as IPayload

    request.user_id = userID

    return next()
  } catch (error) {
    return response.status(401).json({ error: 'Token is not valid' })
  }

}

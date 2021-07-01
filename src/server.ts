import 'reflect-metadata'
import './database'
import express, { json, NextFunction, Request, Response } from "express"
import 'express-async-errors'

import { routes } from './routes'

const PORT = 3333
const app = express()

app.use(json())

app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
})

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}! 🚀`)
})

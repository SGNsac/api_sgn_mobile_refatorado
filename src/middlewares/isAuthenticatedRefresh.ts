/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

interface IdecodeAcessToken {
  USUA_SIGLA: string,
}

const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
): any => {
  const authHeader = request.headers.authorization

  dotenv.config()

  const secret = process.env.TOKEN_SECRET_REFRESH + ''

  if (!authHeader) {
    return response.status(400).json({ message: 'TOKEN IS MISSING' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decodeToken = jwt.verify(token, secret) as IdecodeAcessToken

    request.globalSigla = decodeToken.USUA_SIGLA

    return next()
  } catch {
    return response.status(400).json({ message: 'TOKEN IS INVALID' })
  }
}

export default isAuthenticated

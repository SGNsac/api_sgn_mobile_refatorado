import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import AppError from '../errors/AppError'

const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
):void => {
  const authHeader = request.headers.authorization

  dotenv.config()
  const secret = process.env.TOKEN_SECRET_REFRESH + ''
  if (!authHeader) {
    throw new AppError('JWT is missing')
  }
  const [, token] = authHeader.split(' ')
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const decodeToken = jwt.verify(token, secret)
    return next()
  } catch {
    throw new AppError('JWT is invalid')
  }
}

export default isAuthenticated

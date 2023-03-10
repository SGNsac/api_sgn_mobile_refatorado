import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

interface IdecodeAcessToken {
  sigla: string,
  cod: string
}

const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
):void| Response => {
  const authHeader = request.headers.authorization

  dotenv.config()
  const secret = process.env.TOKEN_SECRET_ACESS + ''
  if (!authHeader) {
    return response.status(400).json({ message: 'Invalid Token', status: 400 })
  }
  const [, token] = authHeader.split(' ')

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const decodeToken = jwt.verify(token, secret) as IdecodeAcessToken

    const cod = decodeToken.cod

    request.globalCodigo = cod
    console.log('====================================')
    console.log(request.globalCodigo)
    console.log('====================================')
    return next()
  } catch (e) {
    return response.status(400).json({ message: 'Invalid Token', status: 400 })
  }
}

export default isAuthenticated

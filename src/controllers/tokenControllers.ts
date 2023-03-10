/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import { TradePasswordService } from '../services/user/tradePasswordServices'
import { LoginService } from '../services/user/loginServices'
import { GenerateTokenService } from '../services/user/GenerateTokenService'

export default class TokenController {
  public async generateToken (
    request: Request,
    response: Response
  ): Promise<Response> {
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return response.status(400).json({ message: 'TOKEN IS MISSING' })
    }
    const [, refreshToken] = authHeader.split(' ')

    const { url, database } = request.body

    const generateToken = new GenerateTokenService()

    const acessToken = await generateToken.execute(
      refreshToken,
      request.globalSigla,
      url,
      database
    )

    return response.json({ acessToken })
  }
}

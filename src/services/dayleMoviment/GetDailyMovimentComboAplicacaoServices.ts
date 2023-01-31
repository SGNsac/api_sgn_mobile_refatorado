import dotenv from 'dotenv'
import { MovimentoDiarioRepository } from '../../typeorm/repository/movimentoDiarioRepositories'
import { selectComboAplicacao } from '../../queries'
import jwt from 'jsonwebtoken'

dotenv.config()

interface IdecodeAcessToken {
  refreshToken: string,
  USUA_SIGLA: string,
  codUser: string
}

interface IResponse{
  gaco_nome:string
}

export class GetDailyMovimentComboAplicacaoServices {
  public async execute (TOKEN: string): Promise<IResponse> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken

    const USUA_SIGLA = decodeToken.USUA_SIGLA

    const sql = selectComboAplicacao(USUA_SIGLA)
    const movimentQuery = await MovimentoDiarioRepository.query(sql)
    return movimentQuery
  }
}

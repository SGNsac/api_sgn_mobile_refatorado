import dotenv from 'dotenv'
import { MovimentoDiarioRepository } from '../../typeorm/repository/movimentoDiarioRepositories'
import { selectMovimentacaoAplicacao } from '../../queries'
import jwt from 'jsonwebtoken'

dotenv.config()

interface IdecodeAcessToken {
    refreshToken: string,
    USUA_SIGLA: string,
    codUser: string
}
interface IResponse {
    DEBITO: number,
    CREDITO: number,
    SALDO: number,
    DATA: string
}

export class FilterAplicacao {
  public async execute (TOKEN: string, aplicacao: string): Promise<IResponse> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken

    const USUA_SIGLA = decodeToken.USUA_SIGLA

    const sql = selectMovimentacaoAplicacao(USUA_SIGLA, aplicacao)
    const movimentQuery = await MovimentoDiarioRepository.query(sql)

    return movimentQuery
  }
}

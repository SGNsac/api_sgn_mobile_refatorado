import dotenv from 'dotenv'
import { FilialRepository } from '../../typeorm/repository/filialRepositories'
import { searchEmprUsua } from '../../queries'
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

export class GetBranchService {
  public async execute (codEmpr: string): Promise<IResponse> {
    const sql = searchEmprUsua(codEmpr)

    const empresaQuery = await FilialRepository.query(sql)

    return empresaQuery
  }
}

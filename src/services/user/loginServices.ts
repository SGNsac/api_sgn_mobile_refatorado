import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { queryStringConnect } from '../../sql'
import sql from 'mssql'
import { verifyUserSigla } from '../../queries/user'

dotenv.config()

interface Ilogin {
  USUA_SIGLA: string,
  USUA_SENHA_APP: string,
  url: string,
  database: string
}

interface ILoginReturn {
  message: string,
  error: boolean,
  status: number,
  refreshToken: string
}

export class LoginService {
  public async execute (
    {
      USUA_SIGLA,
      USUA_SENHA_APP,
      url,
      database
    } : Ilogin
  ): Promise<ILoginReturn> {
    try {
      const Tokenuuid = process.env.TOKEN_SECRET_REFRESH + ''

      const verifyUserSiglaSQL = verifyUserSigla(USUA_SIGLA)

      const stringConnect = queryStringConnect(url, database)

      await sql.connect(stringConnect)

      const resultVerify = await sql.query(verifyUserSiglaSQL)

      if (resultVerify.recordset[0].USUA_SENHA_APP === null) {
        return ({
          message: 'Úsuario sem senha do APP cadastrada',
          error: true,
          status: 400,
          refreshToken: ''
        })
      }

      const comparePassword = await bcrypt.compare(USUA_SENHA_APP, resultVerify.recordset[0].USUA_SENHA_APP)

      if (!comparePassword) {
        return ({
          message: 'Senha incorreta',
          error: true,
          status: 400,
          refreshToken: ''
        })
      }

      if (resultVerify.recordset[0].USUA_BLOQ !== 'N') {
        return ({
          message: 'Úsuario bloqueado',
          error: true,
          status: 400,
          refreshToken: ''
        })
      }

      const sigla = USUA_SIGLA

      const refreshToken = jwt.sign(
        { USUA_SIGLA: sigla },
        Tokenuuid,
        {
          expiresIn: '2h',
          subject: sigla
        }
      )

      return ({
        message: 'Login efetuado',
        error: false,
        status: 200,
        refreshToken
      })
    } catch (error) {
      return ({
        message: 'Login não efetuado: ' + error,
        error: true,
        status: 400,
        refreshToken: ''
      })
    }
  }
}

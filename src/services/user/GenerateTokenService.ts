import { verifyUserSigla } from '../../queries/user'
import { queryStringConnect } from '../../sql'
import sql from 'mssql'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export class GenerateTokenService {
  public async execute (
    TOKEN: string,
    usuario: string,
    url: string,
    database: string
  ) {
    try {
      const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

      const verifyUserSiglaSQL = verifyUserSigla(usuario)

      const stringConnect = queryStringConnect(url, database)

      await sql.connect(stringConnect)

      const resultVerify = await sql.query(verifyUserSiglaSQL)

      if (resultVerify.recordset[0].length <= 0) {
        return 'usuario invalido'
      }

      const codUser = resultVerify.recordset[0].USUA_COD

      const acessToken = jwt.sign(
        {
          TOKEN,
          usuario,
          codUser
        },
        secretAcess,
        {
          expiresIn: '2h'
        }
      )

      return acessToken
    } catch (e) {
      return 'Error = ' + e
    }
  }
}

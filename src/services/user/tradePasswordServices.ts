import bcrypt from 'bcrypt'
import validPassword from '../../utils/validPassword'
import { updatePassword, verifyUserSigla } from '../../queries/user'
import { queryStringConnect } from '../../sql'
import sql from 'mssql'

interface Itrade{
    USUA_SIGLA: string,
    USUA_SENHA_APP: string
    url: string,
    database: string
}

interface IReturn {
  message: string,
  error: boolean,
  status: number,
}

export class TradePasswordService {
  public async execute (
    {
      USUA_SIGLA,
      USUA_SENHA_APP,
      url,
      database
    } : Itrade
  ): Promise<IReturn> {
    if (USUA_SENHA_APP.length < 10) {
      return {
        message: 'Senha de conter mais de 10 caracteres',
        error: true,
        status: 400
      }
    }
    const valid = validPassword(USUA_SENHA_APP)

    if (!valid) {
      return {
        message: 'Senha conter caracteres especiais,número, letra maiuscula e minuscula',
        error: true,
        status: 400
      }
    }
    try {
      const saltRounds = 2

      const passwordHash = await bcrypt.hash(USUA_SENHA_APP, saltRounds)

      const sqlVerifyUserSigla = verifyUserSigla(USUA_SIGLA)

      const stringConnect = queryStringConnect(url, database)

      await sql.connect(stringConnect)

      const resultUSerVerify = await sql.query(sqlVerifyUserSigla)

      const cod = resultUSerVerify.recordset[0].USUA_COD

      const sqlUpdatePassword = updatePassword(cod, passwordHash)

      await sql.query(sqlUpdatePassword)

      return {
        message: 'Senha trocada com sucesso',
        error: false,
        status: 400
      }
    } catch (error) {
      return {
        message: 'Error ' + error,
        error: true,
        status: 200
      }
    }
  }
}

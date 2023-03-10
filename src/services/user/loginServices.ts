import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { queryStringConnect } from '../../sql'
import sql from 'mssql'
import { verifyUser, verifyUserSigla } from '../../queries/user'

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
      console.log('====================================')
      console.log(stringConnect)
      console.log('====================================')
      const resultVerify = await sql.query(verifyUserSiglaSQL)

      console.log('====================================')
      console.log(resultVerify.recordset[0].USUA_SENHA_APP)
      console.log('====================================')

      return ({
        message: 'Login efetuado',
        error: false,
        status: 200,
        refreshToken: ''
      })
    } catch (error) {
      return ({
        message: 'Login não efetuado: ' + error,
        error: true,
        status: 400,
        refreshToken: ''
      })
    }
    // const existsUser = await UsuarioRepository.findOneBy({ USUA_SIGLA })
    // if (!existsUser) {
    //   return ({
    //     message: 'Login incorreto',
    //     error: true,
    //     status: 400,
    //     refreshToken: ''
    //   })
    // }

    // const Tokenuuid = process.env.TOKEN_SECRET_REFRESH + ''

    // if (!existsUser.USUA_SENHA_APP || existsUser.USUA_SENHA_APP === '') {
    //   return ({
    //     message: 'Úsuario sem senha cadastrada',
    //     error: true,
    //     status: 400,
    //     refreshToken: ''
    //   })
    // }

    // const passwordBD = existsUser.USUA_SENHA_APP

    // const sigla = existsUser.USUA_SIGLA

    // const comparePassword = await bcrypt.compare(USUA_SENHA_APP, passwordBD)

    // if (!comparePassword) {
    //   return ({
    //     message: 'Senha incorreta',
    //     error: true,
    //     status: 400,
    //     refreshToken: ''
    //   })
    // }

    // if (existsUser.USUA_BLOQ !== 'N') {
    //   return ({
    //     message: 'Úsuario bloqueado',
    //     error: true,
    //     status: 400,
    //     refreshToken: ''
    //   })
    // }
    // const refreshToken = jwt.sign(
    //   {
    //     sigla
    //   },
    //   Tokenuuid,
    //   {
    //     expiresIn: '2h'
    //   }
    // )

    // return ({
    //   message: 'Login efetuado',
    //   error: false,
    //   status: 200,
    //   refreshToken
    // })
  }
}

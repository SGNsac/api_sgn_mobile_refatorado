
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { countNumAprovAditivoContrato, updateAditivoContrato } from '../../queries/contractAdditive'
import { queryStringConnect } from '../../sql'
import sql from 'mssql'
import { verifyUser } from '../../queries/user'

dotenv.config()

interface IAdcsResponse {
    status: number;
    message: string;
    erro: boolean;
}
interface IdecodeAcessToken {
    refreshToken: string,
    USUA_SIGLA: string,
    codUser: string
}
export class ApprovalContractAdditive {
  public async execute (TOKEN: string, ass: string, codCocs: string, password: string, url: string, database: string): Promise<IAdcsResponse> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken

    const cod = parseInt(decodeToken.codUser)

    try {
      const stringConnect = queryStringConnect(url, database)

      const sqlVerifySql = verifyUser(cod + '')
      await sql.connect(stringConnect)
      const resultVerify = await sql.query(sqlVerifySql)

      return {
        status: 200,
        message: `Aditivo de contrato ${codCocs} aprovado com sucesso`,
        erro: false
      }
    } catch {
      return {
        status: 400,
        message: 'Erro de query',
        erro: true
      }
    }

    // const existsUser = await UsuarioRepository.findOneBy({ USUA_COD: cod })

    // if (!existsUser) {
    //   return ({
    //     status: 400,
    //     message: 'Codigo incorreto',
    //     erro: true
    //   })
    // }

    // const passwordBD = existsUser.USUA_SENHA_APP

    // const comparePassword = await bcrypt.compare(password, passwordBD)

    // if (!comparePassword) {
    //   return ({
    //     message: 'Senha incorreta',
    //     erro: true,
    //     status: 400
    //   })
    // }

    // if (existsUser.USUA_BLOQ !== 'N') {
    //   return ({
    //     message: 'Úsuario bloqueado',
    //     erro: true,
    //     status: 400
    //   })
    // }

    // const selectPageNumAprova = await PedidoEstoqueRepository.query(`
    //   SELECT
    //     PAG2_NUM_APROVACOES_CONTR,
    //     PAG2_TODAS_APROVACOES_CONTR
    //   FROM
    //     PARAMETROS_GERAIS_2
    // `)

    // const sql = countNumAprovAditivoContrato(codCocs)

    // const selectQtdAprova = await PedidoEstoqueRepository.query(sql)

    // let statusSQL = ''

    // if (selectPageNumAprova[0].PAG2_TODAS_APROVACOES_CONTR === 'S') {
    //   if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 1) {
    //     statusSQL = ",ADCS_APROVADO = 'S'"
    //   } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 2 && selectQtdAprova[0].NUM === 1) {
    //     statusSQL = ",ADCS_APROVADO = 'S'"
    //   } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 3 && selectQtdAprova[0].NUM === 2) {
    //     statusSQL = ",ADCS_APROVADO = 'S'"
    //   } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 4 && selectQtdAprova[0].NUM === 3) {
    //     statusSQL = ",ADCS_APROVADO = 'S'"
    //   }
    // } else {
    //   statusSQL = ",ADCS_APROVADO = 'S'"
    // }

    // const sql2 = updateAditivoContrato(codCocs, ass, statusSQL)

    // await PedidoEstoqueRepository.query(
    //   sql2
    // )
  }
}

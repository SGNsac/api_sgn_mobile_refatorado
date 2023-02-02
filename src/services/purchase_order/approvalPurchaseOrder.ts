import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { updateASSSolicitacao } from '../../queries'
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import bcrypt from 'bcrypt'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'

dotenv.config()

interface IdecodeAcessToken {
    refreshToken: string,
    USUA_SIGLA: string,
    codUser: string
}

interface IResponse {
    message: string,
    error: boolean,
    status: number,
}

export class ApprovalPurchaseOrderService {
  public async execute (TOKEN: string, USUA_SENHA_APP: string, posUsuaCod: string, socoCod: string, valorTotalSoco : number): Promise<IResponse> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken

    const cod = parseInt(decodeToken.codUser)

    const existsUser = await UsuarioRepository.findOneBy({ USUA_COD: cod })

    if (!existsUser) {
      return ({
        message: 'Codigo incorreto',
        error: true,
        status: 400
      })
    }

    const passwordBD = existsUser.USUA_SENHA_APP

    const comparePassword = await bcrypt.compare(USUA_SENHA_APP, passwordBD)

    if (!comparePassword) {
      return ({
        message: 'Senha incorreta',
        error: true,
        status: 400
      })
    }

    if (existsUser.USUA_BLOQ !== 'N') {
      return ({
        message: 'Úsuario bloqueado',
        error: true,
        status: 400
      })
    }

    if (existsUser.usua_valor_aprov_solic < valorTotalSoco) {
      return ({
        message: 'Úsuario não pode aprovar um valor tão alto',
        error: true,
        status: 401
      })
    }

    const sql = updateASSSolicitacao(socoCod, posUsuaCod)

    await PedidoEstoqueRepository.query(sql)
    return ({
      message: 'Solicitação aprovada com sucesso',
      error: false,
      status: 200
    })
  }
}

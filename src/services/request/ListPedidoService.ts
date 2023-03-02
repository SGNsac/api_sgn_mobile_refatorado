/* eslint-disable @typescript-eslint/no-explicit-any */
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { selectPedidoEstoque1, selectPedidoEstoque2, selectPedidoEstoque3, selectPedidoEstoque4 } from '../../queries/request'

dotenv.config()

interface IdecodeAcessToken {
  refreshToken: string,
  USUA_SIGLA: string,
  codUser: string
}

export class ListPedidoService {
  public async execute (TOKEN: string): Promise<any> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken

    const cod = decodeToken.codUser

    const sql1 = selectPedidoEstoque1(cod)
    const sql2 = selectPedidoEstoque2(cod)
    const sql3 = selectPedidoEstoque3(cod)
    const sql4 = selectPedidoEstoque4(cod)

    const array: any = []

    const listPedido1 = await PedidoEstoqueRepository.query(sql1)
    const listPedido2 = await PedidoEstoqueRepository.query(sql2)
    const listPedido3 = await PedidoEstoqueRepository.query(sql3)
    const listPedido4 = await PedidoEstoqueRepository.query(sql4)

    if (listPedido1.length > 0) {
      listPedido1.map((pos: any) => array.push(pos))
    }

    if (listPedido2.length > 0) {
      listPedido2.map((pos: any) => array.push(pos))
    }

    if (listPedido3.length > 0) {
      listPedido3.map((pos: any) => array.push(pos))
    }

    if (listPedido4.length > 0) {
      listPedido4.map((pos: any) => array.push(pos))
    }

    return array
  }
}

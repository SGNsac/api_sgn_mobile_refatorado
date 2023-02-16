/* eslint-disable @typescript-eslint/no-explicit-any */
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { searchNumero1, searchNumero2, searchNumero3, searchNumero4 } from '../../queries'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

interface IdecodeAcessToken {
  refreshToken: string,
  USUA_SIGLA: string,
  codUser: string
}

export class ListPedidoNumberService {
  public async execute (TOKEN: string, number:string): Promise<any> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken

    const cod = decodeToken.codUser
    const sql1 = searchNumero1(cod, number)
    const sql2 = searchNumero2(cod, number)
    const sql3 = searchNumero3(cod, number)
    const sql4 = searchNumero4(cod, number)
    const array:any = []
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { searchFunc1, searchFunc2, searchFunc3, searchFunc4 } from '../../queries'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

interface IdecodeAcessToken {
  refreshToken: string,
  USUA_SIGLA: string,
  codUser: string
}

interface IPedi{
  PEDI_TOTAL_MERC : string,
  PEDI_OBS: string,
  PEDI_DESCONTO: string,
  PEDI_STATUS: string,
  PEDI_FRETE: string,
  PEDI_VALOR_APROVADO: string,
  PEDI_VALOR_TOTAL: string,
  PEDI_COD: string,
  PEDI_NUMERO: string,
  FORN_NOME: string,
  PEDI_DATA: string,
  ASS: string,
  EMPR_NOME: string,
  PESS_NOME: string
}

export class ListPedidoFuncService {
  public async execute (TOKEN: string, func: string): Promise<IPedi[]> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken

    const cod = decodeToken.codUser
    const sql1 = searchFunc1(cod, func)
    const sql2 = searchFunc2(cod, func)
    const sql3 = searchFunc3(cod, func)
    const sql4 = searchFunc4(cod, func)
    const array: IPedi[] = []
    const listPedido1 = await PedidoEstoqueRepository.query(sql1)
    const listPedido2 = await PedidoEstoqueRepository.query(sql2)
    const listPedido3 = await PedidoEstoqueRepository.query(sql3)
    const listPedido4 = await PedidoEstoqueRepository.query(sql4)

    if (listPedido1.length > 0) {
      listPedido1.map((pos: IPedi) => array.push(pos))
    }

    if (listPedido2.length > 0) {
      listPedido2.map((pos: IPedi) => array.push(pos))
    }

    if (listPedido3.length > 0) {
      listPedido3.map((pos: IPedi) => array.push(pos))
    }

    if (listPedido4.length > 0) {
      listPedido4.map((pos: IPedi) => array.push(pos))
    }

    return array
  }
}

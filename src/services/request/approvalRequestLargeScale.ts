import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import bcrypt from 'bcrypt'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { countNumAprovaPedido, totalFornCerePedido, totalUsuaPedido, updatePedidoASS } from '../../queries/request'
import { selectUsuaCrParametros } from '../../queries/userResultCenter'
import { pegaPeriodo } from '../../utils/pegaPeriodoPedido'

dotenv.config()

interface IdecodeAcessToken {
  refreshToken: string,
  USUA_SIGLA: string,
  codUser: string
}

interface IResponse {
  message: string,
}

export class ApprovalLargeScaleRequestService {
  public async execute (TOKEN: string, USUA_SENHA_APP: string, posUsuaCod: string, pediCod: string, cereCod: string, valTotal: string, fornCod: string): Promise<IResponse> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken

    const cod = parseInt(decodeToken.codUser)

    const existsUser = await UsuarioRepository.findOneBy({ USUA_COD: cod })

    if (!existsUser) {
      return ({
        message: 'Codigo incorreto'
      })
    }

    const passwordBD = existsUser.USUA_SENHA_APP

    const comparePassword = await bcrypt.compare(USUA_SENHA_APP, passwordBD)

    if (!comparePassword) {
      return ({
        message: 'Senha incorreta'
      })
    }

    const sqlUsuarioCr = selectUsuaCrParametros(cod + '', cereCod)

    const sqlUsuarioCrData = await PedidoEstoqueRepository.query(sqlUsuarioCr)

    const USCR_VLR_MAX_APROV_PED = sqlUsuarioCrData[0].USCR_VLR_MAX_APROV_PED
    const USCR_VLR_MAX_APROV_PED_FORN = sqlUsuarioCrData[0].USCR_VLR_MAX_APROV_PED_FORN

    if (USCR_VLR_MAX_APROV_PED > 0) {
      if (USCR_VLR_MAX_APROV_PED < parseInt(valTotal)) {
        return ({
          message: `Pedido ${pediCod} reprovado valor do pedido acima do valor que o usuario pode aprovar nesse CR`
        })
      }
    } else {
      if (existsUser.USUA_VALOR_APROVACAO > 0) {
        if (parseInt(valTotal) > existsUser.USUA_VALOR_APROVACAO) {
          return ({
            message: `Pedido ${pediCod} reprovado valor do pedido acima do valor que o usuario pode aprovar`
          })
        }
      }
    }
    const periodo = pegaPeriodo('PEDI_DATA')

    const sqlTotalFornCerePedido = totalFornCerePedido(cereCod, fornCod, periodo)

    if (USCR_VLR_MAX_APROV_PED_FORN > 0) {
      console.log(sqlTotalFornCerePedido)

      const totalFornCerePedidoData = await PedidoEstoqueRepository.query(sqlTotalFornCerePedido)

      let totalFornCerePedidoValue = 0
      for (let i = 0; i < totalFornCerePedidoData; i++) {
        totalFornCerePedidoValue += totalFornCerePedidoData[i].VALOR
      }

      totalFornCerePedidoValue += parseInt(valTotal)

      if (USCR_VLR_MAX_APROV_PED_FORN < totalFornCerePedidoValue) {
        return ({
          message: `Pedido ${pediCod} reprovado valor do pedido acima do valor mensal de aprovação para esse fornecedor`
        })
      }
    } else {
      if (existsUser.USUA_VALOR_APROVACAO_MENSAL > 0) {
        const sqlTotalUsuaPedido = totalUsuaPedido(cod + '', periodo)

        const totalUsuaPedidoData = await PedidoEstoqueRepository.query(sqlTotalUsuaPedido)
        let totalUsuaPedidoValue = 0
        for (let i = 0; i < totalUsuaPedidoData; i++) {
          totalUsuaPedidoValue += totalUsuaPedidoData[i].VALOR
        }
        totalUsuaPedidoValue += parseInt(valTotal)

        if (existsUser.USUA_VALOR_APROVACAO_MENSAL < totalUsuaPedidoValue) {
          return ({
            message: `Pedido ${pediCod} reprovado valor do pedido acima do valor que o usuario pode aprovar por mês`
          })
        }
      }
    }

    let sqlQuery = ''

    const sqlCountNumAprovaPedido = countNumAprovaPedido(pediCod)

    const valCountNumAprovaPedido = await PedidoEstoqueRepository.query(sqlCountNumAprovaPedido)

    const valCountNumAprovaPedidoBD = await PedidoEstoqueRepository.query(
      `
      SELECT 
        PAGE_NUM_APROVACOES_PEDIDO,
        PAGE_TODAS_APROVACOES_PEDIDO
      FROM 
        PARAMETROS_GERAIS
      `
    )

    if (valCountNumAprovaPedidoBD[0].PAGE_TODAS_APROVACOES_PEDIDO === 'S') {
      if (valCountNumAprovaPedidoBD[0].PAGE_NUM_APROVACOES_PEDIDO === 1) {
        sqlQuery = "PEDI_STATUS = 'A',"
      } else if (valCountNumAprovaPedidoBD[0].PAGE_NUM_APROVACOES_PEDIDO === 2 && valCountNumAprovaPedido[0].NUM === 1) {
        sqlQuery = "PEDI_STATUS = 'A',"
      } else if (valCountNumAprovaPedidoBD[0].PAGE_NUM_APROVACOES_PEDIDO === 3 && valCountNumAprovaPedido[0].NUM === 2) {
        sqlQuery = "PEDI_STATUS = 'A',"
      } else if (valCountNumAprovaPedidoBD[0].PAGE_NUM_APROVACOES_PEDIDO === 4 && valCountNumAprovaPedido[0].NUM === 3) {
        sqlQuery = "PEDI_STATUS = 'A',"
      }
    } else {
      sqlQuery = "PEDI_STATUS = 'A',"
    }

    const sql = updatePedidoASS(pediCod, posUsuaCod, sqlQuery)

    await PedidoEstoqueRepository.query(sql)

    return ({
      message: `Pedido ${pediCod} provado com sucesso`
    })
  }
}

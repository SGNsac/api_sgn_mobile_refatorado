import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { totalFornCerePedido, totalUsuaPedido } from '../../queries/request'
import { selectUsuaCrParametros } from '../../queries/userResultCenter'
import { pegaPeriodo } from '../../utils/pegaPeriodoPedido'
dotenv.config()

interface IdecodeAcessToken {
    refreshToken: string,
    USUA_SIGLA: string,
    codUser: string
}

export const validCereFornPedi = async (TOKEN: string, cereCod: string, valTotal: string, fornCod: string, pediCod:string) => {
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

  const sqlUsuarioCr = selectUsuaCrParametros(cod + '', cereCod)

  const sqlUsuarioCrData = await PedidoEstoqueRepository.query(sqlUsuarioCr)

  const USCR_VLR_MAX_APROV_PED = sqlUsuarioCrData[0].USCR_VLR_MAX_APROV_PED
  const USCR_VLR_MAX_APROV_PED_FORN = sqlUsuarioCrData[0].USCR_VLR_MAX_APROV_PED_FORN

  if (USCR_VLR_MAX_APROV_PED > 0) {
    if (USCR_VLR_MAX_APROV_PED < parseInt(valTotal)) {
      return ({
        message: `Pedido ${pediCod} reprovado valor do pedido acima do valor que o usuario pode aprovar nesse CR`,
        error: true,
        status: 400
      })
    }
  } else {
    if (existsUser.USUA_VALOR_APROVACAO > 0) {
      if (parseInt(valTotal) > existsUser.USUA_VALOR_APROVACAO) {
        return ({
          message: `Pedido ${pediCod} reprovado valor do pedido acima do valor que o usuario pode aprovar`,
          error: true,
          status: 400
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
        message: `Pedido ${pediCod} reprovado valor do pedido acima do valor mensal de aprovação para esse fornecedor`,
        error: true,
        status: 400
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
          message: `Pedido ${pediCod} reprovado valor do pedido acima do valor que o usuario pode aprovar por mês`,
          error: true,
          status: 400
        })
      }
    }
  }
  return ({
    message: '',
    error: false,
    status: 200
  })
}

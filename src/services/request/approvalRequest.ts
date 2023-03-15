
import sql from 'mssql'
import { countNumAprovaPedido, updatePedidoASS } from '../../queries/request'
import { queryStringConnect } from '../../sql'
import { selectAprovaPedido } from '../../queries/parametrosGerais'
import { verifyValidUser } from '../../utils/validUser'

export class ApprovalRequestService {
  public async execute (
    USUA_SENHA_APP: string,
    posUsuaCod: string,
    pediCod: string,
    pediNumero: string,
    codUsua: string,
    url: string,
    database:string
  )/*: Promise<IResponse> */ {
    try {
      // const verifyUserSiglaSQL = verifyUser(codUsua)

      const stringConnect = queryStringConnect(url, database)

      await sql.connect(stringConnect)

      const verifyValidUserFunc = await verifyValidUser({ codUsua, url, database, senhaApp: USUA_SENHA_APP, tipo: '', valorTotalSoco: 0 })

      if (verifyValidUserFunc.error === true) {
        return ({
          message: verifyValidUserFunc.message,
          error: verifyValidUserFunc.error,
          status: verifyValidUserFunc.status
        })
      }

      let sqlQuery = ''

      const sqlCountNumAprovaPedido = countNumAprovaPedido(pediCod)

      const valCountNumAprovaPedido = await sql.query(sqlCountNumAprovaPedido)

      const selectAprovaPedidoQuery = selectAprovaPedido()

      const valCountNumAprovaPedidoBD = await sql.query(selectAprovaPedidoQuery)

      if (valCountNumAprovaPedidoBD.recordset[0].PAGE_TODAS_APROVACOES_PEDIDO === 'S') {
        if (valCountNumAprovaPedidoBD.recordset[0].PAGE_NUM_APROVACOES_PEDIDO === 1) {
          sqlQuery = "PEDI_STATUS = 'A',"
        } else if (valCountNumAprovaPedidoBD.recordset[0].PAGE_NUM_APROVACOES_PEDIDO === 2 && valCountNumAprovaPedido.recordset[0].NUM === 1) {
          sqlQuery = "PEDI_STATUS = 'A',"
        } else if (valCountNumAprovaPedidoBD.recordset[0].PAGE_NUM_APROVACOES_PEDIDO === 3 && valCountNumAprovaPedido.recordset[0].NUM === 2) {
          sqlQuery = "PEDI_STATUS = 'A',"
        } else if (valCountNumAprovaPedidoBD.recordset[0].PAGE_NUM_APROVACOES_PEDIDO === 4 && valCountNumAprovaPedido.recordset[0].NUM === 3) {
          sqlQuery = "PEDI_STATUS = 'A',"
        }
      } else {
        sqlQuery = "PEDI_STATUS = 'A',"
      }
      const sqlQueryUpdate = updatePedidoASS(pediCod, posUsuaCod, sqlQuery)

      await sql.query(sqlQueryUpdate)

      return ({
        message: `Pedido ${pediNumero} aprovado com sucesso`,
        error: false,
        status: 200
      })
    } catch (e) {
      return ({
        message: 'Error = ' + e,
        error: true,
        status: 400
      })
    }
  }
}

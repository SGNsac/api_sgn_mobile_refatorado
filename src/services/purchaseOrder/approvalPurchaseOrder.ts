import { countNumAprovaSoliCompra, updateASSSolicitacao } from '../../queries/purchaseOrder'
import sql from 'mssql'
import { queryStringConnect } from '../../sql'
import { verifyValidUser } from '../../utils/validUser'

interface IResponse {
    message: string,
    error: boolean,
    status: number,
}

export class ApprovalPurchaseOrderService {
  public async execute (codUsua: string, USUA_SENHA_APP: string, posUsuaCod: string, socoCod: string, valorTotalSoco: number, url: string, database: string, socoNumber: string): Promise<IResponse> {
    try {
      // const verifyUserSiglaSQL = verifyUser(codUsua)

      const stringConnect = queryStringConnect(url, database)

      await sql.connect(stringConnect)

      const verifyValidUserFunc = await verifyValidUser({ codUsua, url, database, senhaApp: USUA_SENHA_APP, tipo: 'solicitacaoCompra', valorTotalSoco })

      if (verifyValidUserFunc.error === true) {
        return ({
          message: verifyValidUserFunc.message,
          error: verifyValidUserFunc.error,
          status: verifyValidUserFunc.status
        })
      }

      const sqlContNumAprovaS = countNumAprovaSoliCompra(socoCod)

      const countNumAprovaS = await sql.query(sqlContNumAprovaS)

      const sqlAprovaNumPage = await sql.query(`
        SELECT 
          page_num_aprovacoes_solic,
          page_todas_aprovacoes_solic
        FROM 
          PARAMETROS_GERAIS
      `)

      let statusSQL = ''

      if (sqlAprovaNumPage.recordset[0].page_todas_aprovacoes_solic === 'S') {
        if (sqlAprovaNumPage.recordset[0].page_num_aprovacoes_solic === 1) {
          statusSQL = "SOCO_STATUS = 'AP',"
        } else if (sqlAprovaNumPage.recordset[0].page_num_aprovacoes_solic === 2 && countNumAprovaS.recordset[0].NUM === 1) {
          statusSQL = "SOCO_STATUS = 'AP',"
        }
      } else {
        statusSQL = "SOCO_STATUS = 'AP',"
      }

      const sqlQuery = updateASSSolicitacao(socoCod, posUsuaCod, statusSQL)

      await sql.query(sqlQuery)
      return ({
        message: `Solicitação ${socoNumber} aprovada com sucesso`,
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

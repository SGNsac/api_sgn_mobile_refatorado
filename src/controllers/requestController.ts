import { Request, Response } from 'express'
import { ListPedidoService } from '../services/request/ListPedidoService'
import { ApprovalRequestService } from '../services/request/approvalRequest'
import { GetDetailsRequestServices } from '../services/request/getDetailsRequestServices'
import { selectCerePeitPedi } from '../queries/request'
import { validCereFornPedi } from '../services/request/validCereForn'
import sql from 'mssql'
import { queryStringConnect } from '../sql'

export default class DailyMovimentController {
  public async list (request: Request, response: Response): Promise<Response> {
    const { database, url } = request.body

    const listPedidoService = new ListPedidoService()

    const execute = await listPedidoService.execute('', request.globalCodigo, database, url)

    return response.json(execute)
  }

  public async listNumber (request: Request, response: Response): Promise<Response> {
    const { database, url, number } = request.body

    const queryString = `
    AND
      PEDI_NUMERO = '${number}'
    `

    const listPedidoNumberService = new ListPedidoService()

    const execute = await listPedidoNumberService.execute(queryString, request.globalCodigo, database, url)

    return response.json(execute)
  }

  public async listForn (request: Request, response: Response): Promise<Response> {
    const { database, url, forn } = request.body

    const queryString = `
    AND
      FORN_NOME LIKE '%${forn}%'
    `

    const listPedidoFornService = new ListPedidoService()

    const execute = await listPedidoFornService.execute(queryString, request.globalCodigo, database, url)

    return response.json(execute)
  }

  public async listFunc (request: Request, response: Response): Promise<Response> {
    const { database, url, func } = request.body

    const queryString = `
    AND
      PESS_NOME LIKE '%${func}%'
    `
    const listPedidoFuncService = new ListPedidoService()

    const execute = await listPedidoFuncService.execute(queryString, request.globalCodigo, database, url)

    return response.json(execute)
  }

  public async approvalRequest (request: Request, response: Response): Promise<Response> {
    const { USUA_SENHA_APP, posUsuaCod, pediCod, fornCod, valTotal, pediNumero, url, database } = request.body

    const approvalRequestService = new ApprovalRequestService()

    const sqlQuery = selectCerePeitPedi(pediCod)

    const stringConnect = queryStringConnect(url, database)

    await sql.connect(stringConnect)

    const sqlExec = await sql.query(sqlQuery)

    for (let i = 0; i < sqlExec.recordset.length; i++) {
      const valid = await validCereFornPedi(request.globalCodigo, sqlExec.recordset[i].CERE_COD + '', valTotal, fornCod, pediCod, pediNumero, url, database)

      if (valid.error === true) {
        return response.status(valid.status).json(valid)
      }
    }

    const approvalRequestExec = await approvalRequestService.execute(USUA_SENHA_APP, posUsuaCod, pediCod, pediNumero, request.globalCodigo, url, database)

    return response.status(approvalRequestExec.status).json(approvalRequestExec)
  }

  public async approvalLargeScale (request: Request, response: Response) {
    const { USUA_SENHA_APP, arrayPedido, url, database } = request.body

    const pedidosTxt:string[] = []
    let status = 200
    let error = false

    const stringConnect = queryStringConnect(url, database)

    await sql.connect(stringConnect)

    for await (const item of arrayPedido) {
      const sqlQuery = selectCerePeitPedi(request.globalCodigo)

      const sqlExec = await sql.query(sqlQuery)

      for (let i = 0; i < sqlExec.recordset.length; i++) {
        const valid = await validCereFornPedi(request.globalCodigo, sqlExec.recordset[i].CERE_COD, item.valTotal, item.fornCod, item.pediCod, item.pediNumero, url, database)

        if (valid.error === true) {
          pedidosTxt.push(valid.message + '')
          status = 400
          error = true
          break
        }

        if (i === sqlExec.recordset.length || valid.error === false) {
          const approvalRequestService = new ApprovalRequestService()
          const approvalRequestExec = await approvalRequestService.execute(USUA_SENHA_APP, item.ASS, item.pediCod, item.pediNumero, request.globalCodigo, url, database)
          pedidosTxt.push(approvalRequestExec.message)

          status = approvalRequestExec.status
          error = approvalRequestExec.error
        }
      }
    }

    return response.status(status).json({
      message: pedidosTxt,
      error,
      status
    })
  }

  public async ListItems (request: Request, response: Response): Promise<Response> {
    const { database, url, pediCod } = request.body

    const getDetailsRequestServices = new GetDetailsRequestServices()

    const execute = await getDetailsRequestServices.execute(pediCod, database, url)

    return response.json(execute)
  }
}

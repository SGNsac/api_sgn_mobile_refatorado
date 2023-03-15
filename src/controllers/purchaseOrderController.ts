import { Request, Response } from 'express'
import { ListPurchaseOrderService } from '../services/purchaseOrder/listPurchaseOrder'
import { ApprovalPurchaseOrderService } from '../services/purchaseOrder/approvalPurchaseOrder'

export class PurchaseOrderController {
  public async list (request: Request, response: Response) {
    const { url, database } = request.body

    const listPurchaseOrderService = new ListPurchaseOrderService()

    const listPurchaseOrderServiceExec = await listPurchaseOrderService.execute(request.globalCodigo, url, database, '')

    return response.status(listPurchaseOrderServiceExec.status).json({
      message: listPurchaseOrderServiceExec.message,
      error: listPurchaseOrderServiceExec.error,
      status: listPurchaseOrderServiceExec.status
    })
  }

  public async approvalOrderPurchase (request: Request, response: Response) {
    const approvalPurchaseOrderService = new ApprovalPurchaseOrderService()

    const {
      USUA_SENHA_APP,
      arraySolicitacaoCompra,
      url,
      database
    } = request.body

    let error = false

    let status = 400

    const message: string[] = []

    for await (const item of arraySolicitacaoCompra) {
      const execute = await approvalPurchaseOrderService.execute(
        request.globalCodigo,
        USUA_SENHA_APP,
        item.assPos,
        item.socoCod,
        item.valorTotalSoco,
        url,
        database,
        item.socoNumber
      )
      if (execute.error) {
        error = execute.error
        status = execute.status
      }
      message.push(execute.message)
    }

    return response.status(status).json({
      message,
      error,
      status
    })
  }

  public async listFilerNumber (request: Request, response: Response) {
    const { url, database, numeroSoco } = request.body

    const listPurchaseOrderService = new ListPurchaseOrderService()
    const queryString = `
    AND
      SOCO_NUMERO = ${numeroSoco}
    `
    const listPurchaseOrderServiceExec = await listPurchaseOrderService.execute(request.globalCodigo, url, database, queryString)

    return response.status(listPurchaseOrderServiceExec.status).json({
      message: listPurchaseOrderServiceExec.message,
      error: listPurchaseOrderServiceExec.error,
      status: listPurchaseOrderServiceExec.status
    })
  }

  public async listFilerWarehouse (request: Request, response: Response) {
    const { url, database, almoDesc } = request.body

    const listPurchaseOrderService = new ListPurchaseOrderService()
    const queryString = `
    AND
      ALMO_DESC LIKE '%${almoDesc}%'
    `
    const listPurchaseOrderServiceExec = await listPurchaseOrderService.execute(request.globalCodigo, url, database, queryString)

    return response.status(listPurchaseOrderServiceExec.status).json({
      message: listPurchaseOrderServiceExec.message,
      error: listPurchaseOrderServiceExec.error,
      status: listPurchaseOrderServiceExec.status
    })
  }

  public async listFilerPurchasingSector (request: Request, response: Response) {
    const { url, database, secoDesc } = request.body

    const listPurchaseOrderService = new ListPurchaseOrderService()
    const queryString = `
    AND
      SECO_DESC LIKE '%${secoDesc}%'
    `
    const listPurchaseOrderServiceExec = await listPurchaseOrderService.execute(request.globalCodigo, url, database, queryString)

    return response.status(listPurchaseOrderServiceExec.status).json({
      message: listPurchaseOrderServiceExec.message,
      error: listPurchaseOrderServiceExec.error,
      status: listPurchaseOrderServiceExec.status
    })
  }

  public async listFilerCr (request: Request, response: Response) {
    const { url, database, cereNome } = request.body

    const listPurchaseOrderService = new ListPurchaseOrderService()
    const queryString = `
    AND
      CERE_NOME LIKE '%${cereNome}%'
    `
    const listPurchaseOrderServiceExec = await listPurchaseOrderService.execute(request.globalCodigo, url, database, queryString)

    return response.status(listPurchaseOrderServiceExec.status).json({
      message: listPurchaseOrderServiceExec.message,
      error: listPurchaseOrderServiceExec.error,
      status: listPurchaseOrderServiceExec.status
    })
  }

  public async listFilerDate (request: Request, response: Response) {
    const { url, database, data } = request.body

    const listPurchaseOrderService = new ListPurchaseOrderService()
    const queryString = `
    AND
      SOCO_DTSOLI = '${data}'
    `
    const listPurchaseOrderServiceExec = await listPurchaseOrderService.execute(request.globalCodigo, url, database, queryString)

    return response.status(listPurchaseOrderServiceExec.status).json({
      message: listPurchaseOrderServiceExec.message,
      error: listPurchaseOrderServiceExec.error,
      status: listPurchaseOrderServiceExec.status
    })
  }
}
